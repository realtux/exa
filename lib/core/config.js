import helper from '#exa/core/helper.js';
import logger from '#exa/core/logger.js';

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
        use: true,
        host: '0.0.0.0',
        port: 8118,
        base_url: `http://127.0.0.1:8118`,
        cors: {
            origins: '*',
            methods: '*',
            headers: '*',
        }
    },

    websocket: {
        use: true,
    },

    database: {
        use: false,
        username: '',
        password: '',
        name: '',
        host: '127.0.0.1',
        port: 3306,
        timezone: 'UTC',
    },

    console: {
        use: true,
        quiet: false,
    },

    views: {
        use: false,
        engine: 'nunjucks'
    },

    public: {
        use: true,
        base_url: '/public',
    },

};

export const init = async root_dir => {
    config.paths.root = root_dir;

    try {
        // perform config merge
        const { default: custom_config } = await import(`${config.paths.root}/config/master.js`);

        config = helper.deep_merge({ ...config }, custom_config);

        return true;
    } catch (e) {
        return false;
    }
};

export default config;
