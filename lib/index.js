import * as dotenv from 'dotenv';
import dotenv_expand from 'dotenv-expand';
dotenv_expand.expand(dotenv.config());

import config, { init as init_config } from '#exa/core/config.js';
import connection, { init as init_db } from '#exa/database/connection.js';
import models, { init as init_models } from '#exa/database/models.js';
import express, { init as init_express } from '#exa/http/express.js';
import chalk from 'chalk';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { DateTime } from 'luxon';
import { dirname } from 'node:path';
import fs from 'node:fs/promises';
import logger from '#exa/core/logger.js';

const handle_fatal_logging = err => {
    logger.error(chalk.red('time'), DateTime.now().toISO());

    if (err instanceof Error) {
        logger.error_no_dim(chalk.red('error:'), err.message);
        logger.error(chalk.red('stack:'), err.stack.toString());
        if (err.sql) {
            logger.error(chalk.red('query:'), err.sql);
            logger.error(chalk.red('parameters:'), err.parameters);
        }
    } else if (typeof err === 'string') {
        logger.error(err);
    } else if (typeof err === 'object') {
        logger.error(err.toString());
    }

    process.exit(1);
};
process.on('uncaughtException', err => {
    logger.error(`exa uncaught exception:`);
    handle_fatal_logging(err);
});

process.on('unhandledRejection', (err, promise) => {
    logger.error(`exa unhandled rejection:`);
    handle_fatal_logging(err);
});

export default new class {

    config = config
    database = {
        connection,
        models,
    }
    http = {
        express,
    }

    async start(file) {
        const exa_root = dirname(import.meta.dirname);

        const version = JSON.parse(await fs.readFile(`${exa_root}/package.json`)).version;

        const is_console = process.argv[2] === 'console';

        try {
            /**
             * set up the project root directory, necessary to discover and
             * initiate various userland code
             */
            let initiating_file = fileURLToPath(file);
            let root_dir = dirname(initiating_file);

            let config_loaded = await init_config(root_dir);

            let quiet = false

            if (is_console && config.console.quiet) {
                quiet = true;
            }

            if (!quiet) {
                console.log();
                console.log(`${chalk.green('exa.js')} by tux - v${version}`);
                console.log('--------------------------');
                console.log(`mode: ${config.environment.development ? 'development' : 'production'}`);
                console.log(`time: ${chalk.gray(DateTime.now().toISO())}`);
            }

            if (!config_loaded) {
                logger.error('config missing or invalid, defaults loaded only');
            }

            // set up hooks
            let hooks;

            try {
                hooks = (await import(`${config.paths.root}/config/hooks.js`)).default;
            } catch (e) {
                logger.info('hooks missing or invalid');
            }

            await hooks?.before_startup?.();

            /**
             * initialize database connection and models
             * by default this uses sequelize
             */
            if (config.database.use) {
                await init_db();
                await init_models(quiet);
            }

            if (is_console) {
                let command = process.argv[3];

                /**
                 * handle request in the context of a console command
                 */
                let console_files = await glob(`${config.paths.root}/console/*.js`);
                let scripts = {};

                for (const file of console_files) {
                    let name = file.split('/').slice(-1)[0].split('.')[0];

                    scripts[name] = (await import(file)).default;
                }

                if (scripts[command]) {
                    await scripts[command].run(...process.argv.slice(4))
                } else {
                    logger.error(`no script called ${command} found`);
                }

                await hooks?.before_shutdown?.();

                if (config.console.exit) {
                    process.exit(0);
                }
            } else {
                /**
                 * initiate the express module
                 * this is responsible for the main http server as well
                 * as discovering all routes to set up
                 */
                await init_express();
            }

            await hooks?.after_startup?.();
        } catch (err) {
            logger.error('exa uncaught exception:');
            handle_fatal_logging(err);
        }
    }

}
