---
sidebar_position: 2
---

# project structure

this is an overview of each directory in the project and what it is for. this is also the directories present after initialization.

## directories

### config
contains a `master.js` configuration file. this is used for project level configuration. for environment level configuration, it's recommended to use a `.env` file in the root and transfer relevant env using `process.env` in `master.js`.

### console
contains console scripts that can be invoked with `npm run console <script name>`. see docs for proper format.

### http
contains api logic organized in one or more files. each file contains route definitions, middleware, and handlers. see docs for proper format.

### library
contains user defined library files. this is generally relevant js files for your project that don't fit anywhere else.

### middleware
contains express.js compatible middleware. middleware is configured for use in api logic. see docs for proper format.

### migrations
contains [jmig](https://github.com/realtux/jmig) compatible database migrations files. these are used to apply and rollback changes to a database. please see the jmig readme for usage specifics.

### models
contains sequelize.js compatible database model files. to use a different database orm, set `database.use = false` in `config/master.js` which will disable automatic initialization of the `models` directory. see docs for proper format.

### public
contains publicly available static files. in development, this is served with `express.static()` at base url `/public`. in production, this should be served with a normal web server.

### var
contains variable static data, use this to store files that aren't directly used in your project, such as docs, sql files, notes, etc.

### views
contains view templates for traditional non-async frontends. use `res.render(path, variables)` instead of `res.send()` in your api logic.

### websocket
contains files that represent websocket connection entrypoints. see docs for proper format.
