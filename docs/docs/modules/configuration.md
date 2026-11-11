---
sidebar_position: 1
---

# configuration

## concept

configuration is intended to exist in two locations, one for your base configuration, and one for environment configuration.

## base configuration

this file allows for base configuration. this is intended to have some hard coded configuration and also some dynamic configuration by referencing environment variables with `process.env`. the sample below is what `init` writes. anything you leave out is deep merged with the exa.js defaults, so you can supply only what differs. for instance, you could only supply `http.host` and the rest of that object would fall back to defaults. the lists further down are those defaults.

```js title="config/master.js"
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
```

:::warning[Warning]

don't put secrets in `config/master.js`, use `.env` instead and reference with `process.env.*`

:::

### environment

- `development` (`bool`, default: `false`) - sets development mode on or off
  * by default this checks the value of `process.env.EXAENV` and resolves to `false` if it receives any other value than `development`. it could also be hardcoded `true` or `false` if desired.

### http

this section is used to configure settings for the http module. because the http server is created using express.js, some settings here may reflect this.

- `host` (`string`, default: `0.0.0.0`) - host to listen on. use `0.0.0.0` to listen to all hosts. an empty value also listens on `0.0.0.0`
- `port` (`number`, default: `8118`) - port to listen on
- `base_url` (`string`, default: `http://127.0.0.1:8118`) - base url for the http server
- `cors` (`object`)
  * `origins` (`string|array`, default: `*`) - allowed origins, internally sets `Access-Control-Allow-Origin` header
  * `methods` (`string|array`, default: `*`) - allowed methods, internally sets `Access-Control-Allow-Methods` header
  * `headers` (`string|array`, default: `*`) - allowed headers, internally sets `Access-Control-Allow-Headers` header
- `json` (`object`) - `application/json`
  * `max_size` (`string`, default: `256kb`) - maximum body size, passed through to express
  * `strict` (`bool`, default: `true`) - only accept a json array or object. a bare string or number is rejected
- `urlencoded` (`object`) - `application/x-www-form-urlencoded`
  * `max_size` (`string`, default: `256kb`) - maximum body size, passed through to express
  * `extended` (`bool`, default: `true`) - parse rich objects and arrays. `false` uses the simpler querystring parser
  * `parameter_limit` (`number`, default: `1000`) - maximum number of fields. express uses `1000` when this is omitted
- `text` (`object`) - `text/plain`
  * `max_size` (`string`, default: `256kb`) - maximum body size, passed through to express
- `raw` (`object`) - `application/octet-stream`
  * `max_size` (`string`, default: `256kb`) - maximum body size, passed through to express
- `uploads` (`object`)
  * `adapter` (`string`, default: `memory`) - where uploaded files are kept. `memory` puts each file on `req.files` as a buffer. this is the only adapter right now
  * `max_size` (`number`, default: `67108864`) - largest accepted file, in bytes. multer leaves this unlimited when it is omitted, so the default here is 64mb. a larger file is rejected
  * `max_files` (`number`, default: `10`) - most files accepted in one request. multer leaves this unlimited when it is omitted

### websocket

websockets are part of startup. every file in `websocket/` is loaded. there is no switch for this. see the websockets module for the file format.

### database

this section is used to configure settings for the database module. the built-in database support is through the very great [sequelize.js](https://sequelize.org/) project. a sequelize connection is created on startup and every file in `models/` is loaded.

- `dialect` (`string`, default: `mysql`) - this is passed directly to sequelize.js
  * sequelize.js supports many dialects, please [click here](https://sequelize.org/docs/v6/getting-started/) for more information
- `username` (`string`, default: `''`) - database username
- `password` (`string`, default: `''`) - database password
- `name` (`string`, default: `''`) - database name
- `host` (`string`, default: `127.0.0.1`) - database connection host
- `port` (`number`, default: `3306`) - database connection port
- `timezone` (`string`, default: `UTC`) - timezone to set the database to. sqlite does not receive this value. sequelize rejects any sqlite timezone other than `+00:00`, and sqlite already returns dates as utc

:::tip[Tip]
use `process.env.*` for these values. besides not putting secrets in your config, you'll also need these values for the migrations module.
:::

### console

this section is used to configure console script runner settings.

- `quiet` (`bool`, default: `false`) - hide the exa.js startup banner while a console command runs
- `exit` (`bool`, default: `true`) - exit the process when the console command finishes
  * open connections from sequelize, redis, and similar clients do not keep the process alive while this is `true`
  * set this to `false` when commands are meant to keep running. one command can override it with its own `exit` property
  * `after_console_run` and `after_startup` both run before the process exits

### views

this section is used to configure settings for views and templates.

- `use` (`bool`, default: `false`) - whether or not to enable views
- `engine` (`string`, default: `nunjucks`) - which templating engine to use
  * currently supported engines are
    - nunjucks

### public

this section is used to configure static asset serving. internally this uses express.js. files are served only when `use` is true.

- `use` (`bool`, default: `true`) - whether or not to serve static assets
- `base_url` (`string`, default: `/public`) - base url that static assets should be available on
  * this value is passed to `express.static(path)` internally
- `cache` (`number`, default: `31536000000`) - how long browsers should cache those files, in milliseconds. the default is one year
  * this is passed to `express.static` as `maxAge`, which sets `Cache-Control`
  * `0` sends `max-age=0`

### session

sessions are optional. when `use` is true, route handlers and middleware can read and write `req.session`. values survive across requests for the same browser. the only built-in store is `memory`, which keeps sessions in the process.

- `use` (`bool`, default: `false`) - turn sessions on
- `adapter` (`string`, default: `memory`) - where sessions are stored. `memory` is the only adapter right now
- `name` (`string`, default: `exa.sess`) - session cookie name
- `secret` (`string`, default: `''`) - signs the session cookie. set your own value here, and prefer `process.env` for it. startup fails when sessions are on and this is empty or blank
- `cookie` (`object`) - options for the session id cookie
  * `max_age` (`number`, default: `864000000`) - lifetime in milliseconds. the default is 10 days
  * `path` (`string`, default: `/`) - cookie path
  * `domain` (`string`, default: `null`) - cookie domain. `null` leaves the domain off the cookie
  * `http_only` (`bool`, default: `true`) - hide the cookie from browser javascript
  * `secure` (`bool`, default: `false`) - send the cookie only over https. the default is `false` because the server speaks plain http until you put tls in front of it
  * `same_site` (`string|bool`, default: `lax`) - `lax`, `strict`, `none`, `true`, or `false`. `false` leaves the attribute off
  * `partitioned` (`bool`, default: `false`) - set the `Partitioned` attribute
  * `priority` (`string`, default: `null`) - `low`, `medium`, or `high`. `null` leaves the attribute off

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

:::warning[Warning]

don't check `.env` into source control or you'll likely be checking in secrets. the exa.js template has `.env` in `.gitignore` on purpose to prevent this.

:::
