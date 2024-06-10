import * as dotenv from 'dotenv';
dotenv.config();

import config, { init as init_config } from '#exa/core/config.js';
import connection, { init as init_db } from '#exa/database/connection.js';
import models, { init as init_models } from '#exa/database/models.js';
import express, { init as init_express } from '#exa/http/express.js';
import chalk from 'chalk';
import { glob } from 'glob';

import { fileURLToPath } from 'node:url';
import { DateTime } from 'luxon';

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
        const is_console = process.argv[2] === 'console';

        console.time('startup took');


        console.log();
        console.log(`${chalk.yellow('exa.js')} by tux - v0.0.1`);
        console.log('---------------------------');
        console.log(`ts: ${DateTime.now()}`)

        try {
            /**
             * set up the project root directory, necessary to discover and
             * initiate various userland code
             */
            let initiating_file = fileURLToPath(new URL(file));
            let root_dir = initiating_file.split('/').slice(0, -1).join('/');

            await init_config(root_dir);

            console.log(`mode: ${config.environment.development ? 'development' : 'production'}`);

            /**
             * initialize database connection and models
             * by default this uses sequelize
             */
            if (config.database.use) {
                console.log('initializing database...');
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
            console.log('failed to start');
            console.log(e.stack);
        }

        console.timeEnd('startup took');
    }

}
