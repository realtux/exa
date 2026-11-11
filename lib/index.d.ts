import type { Express } from 'express';
import type { Sequelize } from 'sequelize';
import type { exa_model } from './database/index.js';

export type exa_config = {
    paths: {
        root: string,
        console: string,
        http: string,
        models: string,
        public: string,
        views: string,
    },
    environment: {
        development: boolean,
    },
    http: {
        host: string,
        port: number,
        base_url: string,
        cors: {
            origins: string | string[],
            methods: string | string[],
            headers: string | string[],
        },
        json: {
            max_size: string,
            strict: boolean,
        },
        urlencoded: {
            max_size: string,
            extended: boolean,
            parameter_limit: number,
        },
        text: {
            max_size: string,
        },
        raw: {
            max_size: string,
        },
        uploads: {
            adapter: string,
            max_size: number,
            max_files: number,
        },
    },
    database: {
        dialect: string,
        username: string,
        password: string,
        name: string,
        host: string,
        port: number,
        timezone: string,
    },
    console: {
        quiet: boolean,
        exit: boolean,
    },
    views: {
        use: boolean,
        engine: string,
    },
    public: {
        use: boolean,
        base_url: string,
        cache: number,
    },
    session: {
        use: boolean,
        adapter: string,
        name: string,
        secret: string,
        cookie: {
            max_age: number,
            path: string,
            domain: string | null,
            http_only: boolean,
            secure: boolean,
            same_site: boolean | string,
            partitioned: boolean,
            priority: string | null,
        },
    },

    // app-specific keys added in config/master.js
    [key: string]: any,
};

declare const exa: {
    config: exa_config,
    database: {
        connection: {
            instance: Sequelize,
        },
        models: Record<string, exa_model>,
    },
    http: {
        express: {
            app: Express,
        },
    },
    start(file: string): Promise<void>,
};

export default exa;
