import helper from '#exa/core/helper.js';

let config = {

    /**
     * internal config
     */
    paths: {
        root: '',
        console: '/console',
        http: '/http',
        models: '/models',
        public: '/public',
        views: '/views',
    },

    /**
     * external mergeable config and defaults
     */
    environment: {
        development: false,
    },

    http: {
        host: '0.0.0.0',
        port: 8118,
        base_url: `http://127.0.0.1:8118`,
        cors: {
            origins: '*',
            methods: '*',
            headers: '*',
        },
        json: {
            max_size: '256kb',
            strict: true,
        },
        urlencoded: {
            max_size: '256kb',
            extended: true,
            parameter_limit: 1000,
        },
        text: {
            max_size: '256kb',
        },
        raw: {
            max_size: '256kb',
        },
        uploads: {
            adapter: 'memory',
            max_size: 64 * 1024 * 1024,
            max_files: 10,
        },
    },

    database: {
        dialect: 'mysql',
        username: '',
        password: '',
        name: '',
        host: '127.0.0.1',
        port: 3306,
        timezone: 'UTC',
    },

    console: {
        quiet: false,
        exit: true,
    },

    views: {
        use: false,
        engine: 'nunjucks'
    },

    public: {
        use: true,
        base_url: '/public',
        cache: 365 * 24 * 60 * 60 * 1000,
    },

    session: {
        use: false,
        adapter: 'memory',
        name: 'exa.sess',
        secret: '',
        cookie: {
            max_age: 10 * 24 * 60 * 60 * 1000,
            path: '/',
            domain: null,
            http_only: true,
            secure: false,
            same_site: 'lax',
            partitioned: false,
            priority: null,
        },
    }

};

export const init = async root_dir => {
    config.paths.root = root_dir;

    try {
        // perform config merge
        const { default: custom_config } = await import(`${config.paths.root}/config/master.js`);

        helper.deep_merge(config, custom_config);

        return true;
    } catch (e) {
        return false;
    }
};

export default config;
