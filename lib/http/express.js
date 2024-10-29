import config from '#exa/core/config.js';
import chalk from 'chalk';
import cors from 'cors';
import Express from 'express';
import { glob } from 'glob';
import multer from 'multer';
import nunjucks from 'nunjucks';
import { WebSocketServer } from 'ws';

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
    app.use(Express.urlencoded({ extended: true }));
    app.use('/public', Express.static(`${config.paths.root}/public`));

    // mounted http controller routes
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

            app[method](path, ...middleware.concat(controller[handler].bind(controller)));
        }
    }

    // console.log(`mounted ${chalk.green(controllers.length)} routes`);

    // start server
    const server = app.listen(config.http.port, () => {
        console.log(`server running on ${config.http.host}:${config.http.port}`);
    });

    if (config.http.websocket) {
        // mount websocket paths
        let files = await glob(`${config.paths.root}/websocket/**/*.js`);

        let path_mapper = {};

        for (const file of files) {
            let { default: websocket } = await import(file);

            path_mapper[websocket.route || '/'] = websocket;
        }

        // no files means no need to setup any server
        if (files.length > 0) {
            const wss = new WebSocketServer({ noServer: true });

            wss.on('connection', (socket, req) => {
                const { pathname } = new URL(req.url, 'wss://base.url');

                try {
                    if (path_mapper[pathname]) {
                        path_mapper[pathname].connection(socket, req);
                    } else {
                        path_mapper['/'].connection(socket, req);
                    }
                } catch {
                    console.log('no matching websocket path or fallback file');
                    socket.close();
                }
            });

            server.on('upgrade', (req, socket, head) => {
                wss.handleUpgrade(req, socket, head, socket => {
                    wss.emit('connection', socket, req)
                });
            });
        }
    }

};

export default express;
