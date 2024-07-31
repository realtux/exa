export default {

    environment: {
        // this will enable or disable certain development features
        development: process.env.EXAENV === 'development',
    },

    /**
     * http module configuration
     *   - starts express web server
     *   - creates http routes from http/*
     */
    http: {
        // whether or not to start an express http server
        use: true,
        // host to run on, 0.0.0.0 for all hosts
        host: '0.0.0.0',
        // port to run on
        port: 8118,
        // http server base url
        base_url: 'http://127.0.0.1:8118',
        // whether or not to listen/handle websocket connections
        websocket: true,
    },

    /**
     * database module configuration
     *   - uses sequelize.js
     *   - creates database connection
     */
    database: {
        // whether or not to initialize db models in models/*
        use: true,
        // sequelize dialect to use, supports: mysql | postgres
        dialect: 'mysql',
        username: 'admin',
        password: 'password',
        name: 'database',
        host: '127.0.0.1',
        port: 3306,
    },

    /**
     * console module configuration
     *   - allows console commands ran from console/*
     */
    console: {
        // whether or not to allow console commands
        use: true,
        // whether or not to show startup information
        quiet: false,
    },

    /**
     * views module configuration
     */
    views: {
        // whether or not to enable views
        use: true,
        // which view engine to use, supports: nunjucks
        engine: 'nunjucks',
    },

    /**
     * public static asset configuration
     *   - uses express.static(path)
     */
    public: {
        // whether or not to serve static assets
        use: true,
        // base url to serve static assets on
        base_url: '/public',
    },

    /**
     * user defined custom configuration
     * add anything you'd like to be avaiable at exa.config.*
     */

};
