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
        use: true,
        host: '0.0.0.0',
        port: 8118,
    },

    /**
     * database module configuration
     *   - uses sequelize.js
     *   - creates database connection
     *   - initializes models in models/*
     */
    database: {
        use: true,
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
        use: true,
    },

    /**
     * views module configuration
     *   - available engines:
     *     - nunjucks
     */
    views: {
        use: true,
        engine: 'nunjucks',
    },

    /**
     * public static asset configuration
     *   - uses express.static(path)
     */
    public: {
        use: true,
        base_url: '/public',
    },

    /**
     * user defined custom configuration
     * add anything you'd like
     */

};
