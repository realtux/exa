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
    },

    database: {
        use: false,
    },

    console: {
        use: false,
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

    // perform config merge
    const { default: custom_config } = await import(`${config.paths.root}/config/master.js`);

    for (let prop in custom_config) {
        config[prop] = {
            ...config[prop],
            ...custom_config[prop],
        };
    }
};

export default config;
