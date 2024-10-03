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

process.on('uncaughtException', err => {
    console.log(chalk.red('uncaught last resort'), chalk.yellow(DateTime.now().toISO()));

    if (err instanceof Error) {
        console.error(chalk.cyan('error:'), err.message);
        console.error(chalk.cyan('stack:'), err.stack.toString());
    } else if (typeof err === 'string') {
        console.error(err);
    } else if (typeof err === 'object') {
        console.error(err.toString());
    }
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

            await init_config(root_dir);

            let quiet = false

            if (is_console && config.console.quiet) {
                quiet = true;
            }

            if (!quiet) {
                console.log();
                console.log(`${chalk.yellow('exa.js')} by tux - v${version}`);
                console.log('-----------------------------');
                console.log(`${chalk.green(DateTime.now().toISO())}`);
                console.log('-----------------------------');
                console.log(`mode: ${config.environment.development ? 'development' : 'production'}`);
            }

            /**
             * initialize database connection and models
             * by default this uses sequelize
             */
            if (config.database.use) {
                if (!quiet) {
                    console.log('initializing database...');
                }

                await init_db();
                await init_models();
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
                    console.log(`${chalk.red('*')} no script called ${command} found`);
                }
            } else {
                /**
                 * initiate the express module
                 * this is responsible for the main http server as well
                 * as discovering all routes to set up
                 */
                await init_express();
            }
        } catch (e) {
            console.log('exa uncaught:');
            console.log(e.message);
            console.log(e.stack);
        }
    }

}
