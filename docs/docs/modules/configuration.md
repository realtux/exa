---
sidebar_position: 1
---

# configuration

## concept

configuration is intended to exist in two locations, one for your base configuration, and one for environment configuration.

## base configuration

this file allows for base configuration. this is intended to have some hard coded configuration and also some dynamic configuration by referencing environment variables with `process.env`.

```js title="config/master.js"
export default {

    environment: {
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
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
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
```

:::warning[Warning]

don't put secrets in `config/master.js`, use `.env` instead and reference with `process.env.*`

:::

### environment

- `development` [`bool`] - sets development mode on or off. by default this checks the value of `process.env.EXAENV` and resolves to `false` if it receives any other value than `development`.it could also be hardcoded `true` or `false` if desired.

### http

this section is used to configure settings for the HTTP and WebSockets module. because the HTTP server is created using Express.js, some settings here may reflect this.

- `use` [`bool`] - whether or not to start an http server. 

---

## environment configuration

environment configuration is great for values that are specific to a machine or environment. it's also great when external tools need to access shared environment. this prevents needing to have configuration in multiple locations and is particularly useful when docker is in use.

although optional, it's highly recommend to use a `.env` file for all dynamic variables and also secrets. a sample `.env` file is located at `.env.sample` and a good starting point is to simply copy it `cp .env.sample .env`

`exa.js` will automatically parse any `.env` file and make it available via `process.env` at runtime.

```env title=".env"
EXAENV=production

# optionally add values here and overwrite values in config/master.js
DATABASE_HOST=mysql
DATABASE_PORT=3306
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_NAME=yourdb
```
