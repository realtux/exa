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

    http: {
        use: true,

        host: '0.0.0.0',
        port: 8118,
        base_url: 'http://127.0.0.1:8118',
        websocket: true,
    },

    database: {
        use: true,

        dialect: 'mysql',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
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
```

:::warning[Warning]

don't put secrets in `config/master.js`, use `.env` instead and reference with `process.env.*`

:::

### environment

- `development` [`bool`] - sets development mode on or off. by default this checks the value of `process.env.EXAENV` and resolves to `false` if it receives any other value than `development`.it could also be hardcoded `true` or `false` if desired.

### http

this section is used to configure settings for the http and websockets module. because the http server is created using express.js, some settings here may reflect this.

- `use` [`bool`] - whether or not to start an http server
- `host` [`string`] - host to listen on
  * use `0.0.0.0` to listen to all hosts
- `port` [`number`] - post to listen on
- `base_url` [`string`] - base url for the http server
- `websocket` [`bool`] - whether or not to enable the websocket module
  * setting this to `false` will cause files in `websocket/*` to be ignored

### database

this section is used to configure settings for the database module. the built-in database support is through the very great [sequelize.js](https://sequelize.org/) project. there's absolutely nothing stopping developers from using something else though.

- `use` [`bool`] - whether or not to process models in `models/*`
- `dialect` [`dialect`] - this is passed directly to sequelize.js
  * sequelize.js supports many dialects, please [click here](https://sequelize.org/docs/v6/getting-started/) for more information
- `username` [`string`] - database username
- `password` [`string`] - database password
- `name` [`string`] - database name
- `host` [`string`] - database host
- `port` [`number`] - databse port

:::tip[Tip]
use `process.env.*` for these values. besides not putting secrets in your config, you'll also need these values for the migrations module.
:::

### console

this section is used to configure console script runner settings.

- `use` [`bool`] - whether or not to register console scripts in `console/*`
  * setting this to `false` will disallow console scripts from being ran
- `quiet` [`bool`] - whether or not to suppress exa.js related output
  * exa.js usually has script start-up information, such as version, time, and other information. setting this to `false` will suppress all this so console command output is only from the developer.

### views

this section is used to configure settings for views and templates.

- `use` [`bool`] - whether or not to enable views
- `engine` [`string`] - which templating engine to use
  * currently supported engines are
    - nunjucks

### public

this secion is used to configure static asset serving. internally this uses express.js.

- `use` [`bool`] - whether or not to serve static assets
- `base_url` [`string`] - base url that static assets should be available on
  * this value is passed to `express.static(path)` internally

### user defined configuration

additional configuration can be included at the bottom of the configuration object. any additional configuration placed there will be available at `exa.config.*`.

---

## environment configuration

environment configuration is great for values that are specific to a machine or environment. it's also great when external tools need to access shared environment. this prevents needing to have configuration in multiple locations and is particularly useful when docker is in use.

although optional, it's highly recommend to use a `.env` file for all dynamic variables and also secrets. a sample `.env` file is located at `.env.sample` and a good starting point is to simply copy it `cp .env.sample .env`

`exa.js` will automatically parse any `.env` file and make it available via `process.env` at runtime.

```bash title=".env"
EXAENV=production

# optionally add values here and overwrite values in config/master.js
DATABASE_HOST=mysql
DATABASE_PORT=3306
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_NAME=yourdb

COMPOSE_PROJECT_NAME=exajs
```
