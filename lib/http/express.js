import config from '#exa/core/config.js';
import logger from '#exa/core/logger.js';
import chalk from 'chalk';
import cors from 'cors';
import Express from 'express';
import { glob } from 'glob';
import multer from 'multer';
import nunjucks from 'nunjucks';
import { WebSocketServer } from 'ws';
import session from 'express-session';

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

    app.disable('x-powered-by');

    // cors
    app.use(cors({
        origin: config.http?.cors?.origins ?? '*',
        methods: config.http?.cors?.methods ?? '*',
        allowedHeaders: config.http?.cors?.headers ?? '*',
    }));

    // file handling
    if (config.http.uploads?.adapter !== 'memory') {
        throw new Error(`${config.http.uploads?.adapter} upload adapter not supported`);
    }

    app.use(multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: config.http.uploads.max_size,
            files: config.http.uploads.max_files,
        },
    }).any());

    // base parsers
    app.use(Express.json({
        limit: config.http.json.max_size,
        strict: config.http.json.strict,
    }));
    app.use(Express.urlencoded({
        extended: config.http.urlencoded.extended,
        limit: config.http.urlencoded.max_size,
        parameterLimit: config.http.urlencoded.parameter_limit,
    }));
    app.use(Express.text({
        limit: config.http.text.max_size,
    }));
    app.use(Express.raw({
        limit: config.http.raw.max_size,
    }));

    // session handling
    if (config.session?.use) {
        let secret = config.session.secret;

        if (typeof secret !== 'string' || secret.trim() === '') {
            throw new Error('set session.secret before enabling sessions');
        }

        if (config.session.adapter !== 'memory') {
            throw new Error(`${config.session.adapter} session adapter not supported`);
        }

        app.use(session({
            name: config.session.name,
            secret: config.session.secret,
            resave: false,
            saveUninitialized: false,
            store: new session.MemoryStore(),
            cookie: {
                maxAge: config.session.cookie.max_age,
                path: config.session.cookie.path,
                httpOnly: config.session.cookie.http_only,
                secure: config.session.cookie.secure,
            },
        }));
    }

    // public files
    if (config.public?.use) {
        let static_base_url = config.public.base_url || '/public';

        app.use(static_base_url, Express.static(`${config.paths.root}/public`, {
            maxAge: config.public.cache ?? 0,
        }));
    }

    // mounted http controller routes
    let files = await glob(`${config.paths.root}${config.paths.http}/**/*.js`);

    let route_count = 0;

    for (const file of files) {
        let controller_path = file.replace(config.paths.root + '/', '');

        let { default: controller } = await import(file);

        if (!controller?.routes) {
            logger.error(`routes object missing from controller (${controller_path}), skipping`);
            continue;
        }

        for (const [route, handler] of Object.entries(controller.routes)) {
            let [method, path] = route.split(' ');

            method = method.toLowerCase();

            let middleware = [];

            for (const [action, mw] of Object.entries(controller.middleware || {})) {
                if (action === '*' || action === handler) {
                    middleware = mw;
                }
            }

            if (!controller[handler]) {
                logger.error(`cannot bind to ${file}::${handler}, skipping`);
                continue;
            }

            // catch sync throws and rejected promises so one request cannot exit the process
            let handlers = middleware.concat(controller[handler].bind(controller)).map(fn => {
                return (req, res, next) => {
                    let result;

                    try {
                        result = fn(req, res, next);
                    } catch (err) {
                        next(err);
                        return;
                    }

                    Promise.resolve(result).catch(next);
                };
            });

            app[method](path, ...handlers);

            ++route_count;
        }
    }

    logger.info(`mounted ${chalk.green(route_count)} routes`);

    // the fourth argument makes this an error handler. log the failure and answer. do not exit
    app.use((err, req, res, next) => {
        logger.error('request failed');
        logger.error_no_dim(chalk.red('error:'), err instanceof Error ? err.message : err);

        if (err?.stack) {
            logger.error(chalk.red('stack:'), err.stack.toString());
        }

        if (res.headersSent) {
            next(err);
            return;
        }

        let status = Number(err.status || err.statusCode) || 500;
        let too_large = err.type === 'entity.too.large'
            || (typeof err.code === 'string' && err.code.startsWith('LIMIT_'));

        if (too_large) {
            status = Number(err.status || err.statusCode) || 413;
        }

        if (status < 400 || status > 599) {
            status = 500;
        }

        res.status(status).send({
            message: status >= 500 ? 'internal server error' : (err.message || 'request failed'),
        });
    });

    // start server
    const host = config.http.host || '0.0.0.0';

    const server = app.listen(config.http.port, host, () => {
        logger.info(`http server running on ${host}:${config.http.port}`);
    });

    express.app = app;

    // mount websocket paths
    let ws_files = await glob(`${config.paths.root}/websocket/**/*.js`);

    let path_mapper = {};

    for (const file of ws_files) {
        let { default: websocket } = await import(file);

        path_mapper[websocket.route || '/'] = websocket;
    }

    // no files means no need to setup any server
    if (ws_files.length > 0) {
        const wss = new WebSocketServer({ noServer: true });

        server.on('upgrade', (req, socket, head) => {
            let pathname;

            try {
                pathname = new URL(req.url, 'http://base.url').pathname;
            } catch {
                socket.destroy();
                return;
            }

            // a file with route `/` handles any path that does not have its own file
            let handler = path_mapper[pathname] || path_mapper['/'];

            if (!handler?.connection) {
                socket.write('HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n');
                socket.destroy();
                return;
            }

            wss.handleUpgrade(req, socket, head, ws => {
                Promise.resolve()
                    .then(() => handler.connection(ws, req))
                    .catch(err => {
                        logger.error('websocket connection handler failed');
                        logger.error_no_dim(chalk.red('error:'), err instanceof Error ? err.message : err);

                        if (err?.stack) {
                            logger.error(chalk.red('stack:'), err.stack.toString());
                        }

                        ws.close();
                    });
            });
        });
    }

};

export default express;
