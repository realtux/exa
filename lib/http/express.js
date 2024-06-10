import config from '#exa/core/config.js';
import chalk from 'chalk';
import cors from 'cors';
import Express from 'express';
import { glob } from 'glob';
import multer from 'multer';
import nunjucks from 'nunjucks';

let express = {};

export const init = async () => {
    const app = Express();

    if (config.views.use) {
        switch (config.views.engine) {
            case 'nunjucks':
                nunjucks.configure(config.paths.root + '/views', {
                    autoescape: true,
                    express: app,
                });
                break;
            default:
                throw new Error(`${config.views.engine} view engine not supported`);
        }
    }

    app.set('x-powered-by', 'exa.js');
    app.use(cors());
    app.use(multer({ storage: multer.memoryStorage() }).any());
    app.use(Express.json({ limit: '16mb' }));
    app.use('/public', Express.static(`${config.paths.root}/public`));

    let files = await glob(`${config.paths.root}${config.paths.http}/**/*.js`);

    for (const file of files) {
        let { default: controller } = await import(file);

        for (const [route, handler] of Object.entries(controller.routes)) {
            let [method, path] = route.split(' ');

            let middleware = [];

            for (const [action, mw] of Object.entries(controller.middleware || {})) {
                if (action === '*' || action === handler) {
                    middleware = mw;
                }
            }

            if (!controller[handler]) {
                console.log(`${chalk.red('*')} cannot bind to ${file}::${handler}, skipping`);
                continue;
            }

            app[method](path, ...middleware.concat(controller[handler]));
        }
    }

    // console.log(`mounted ${chalk.green(controllers.length)} routes`);

    app.listen(config.http.port, () => {
        console.log(`server running on ${config.http.host}:${config.http.port}`);
    });
};

export default express;
