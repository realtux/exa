/**
 * detailed configuration reference:
 * https://exa.js.org/modules/configuration
 */
export default {

    environment: {
        development: process.env.EXAENV === 'development',
    },

    http: {
        host: '0.0.0.0',
        port: 8118,
        base_url: 'http://127.0.0.1:8118',
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
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        timezone: 'UTC',
    },

    console: {
        quiet: false,
    },

    views: {
        use: true,
        engine: 'nunjucks',
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
        secret: 'changethistosomethingelseplz',
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

    /**
     * user defined custom configuration
     * add anything you'd like to be available at exa.config.*
     */

};
