export default {

    environment: {
        // this will enable or disable certain development features
        development: true,
    },

    server: {
        /**
         * base http server core information
         */
        host: '0.0.0.0',
        port: 8118,
    },

    formatting: {
        /**
         * whether or not to use opinionated snake case aliases
         * this will include:
         * - nocamel npm module
         * - sequelize symbol and method aliases
         */
        snake_aliases: true,
    }

};
