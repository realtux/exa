/**
 * detailed configuration reference:
 * https://exa.js.org/modules/configuration
 */
export default {

    environment: {
        development: process.env.EXAENV === 'development',
    },

    http: {
        use: true,

        host: '0.0.0.0',
        port: 8118,
        base_url: 'http://127.0.0.1:8118',
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
        use: true,

        dialect: 'mysql',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        timezone: 'UTC',
    },

    console: {
        use: true,

        quiet: false,
    },

    views: {
        use: true,

        engine: 'nunjucks',
    },

    public: {
        use: true,

        base_url: '/public',
    },

    /**
     * user defined custom configuration
     * add anything you'd like to be avaiable at exa.config.*
     */

};
