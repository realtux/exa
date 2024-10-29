## IMPORTANT!!! THIS PROJECT IS AN EARLY ACCESS PREVIEW THAT IS BEING ACTIVELY DEVELOPED. IT MAY OR MAY NOT BE SUITABLE FOR PRODUCTION. EXPECTED 1.0 DATE IS JANUARY OR FEBRUARY 2025. THE PROJECT STATE IS: USEFUL BUT INCOMPLETE

## exa.js by [tux](https://github.com/realtux)
exa.js is a minimal node.js backend framework that has a strong focus on simplicity, modularity, and convention over configuration. 

### motivation
as if the javascript ecosystem needs another framework... i get it, but please know that this project is the culmination of ~10 years of professional development trying to understand what i/people really need in a framework. this project is the consolidated and cleaned up version of about 30 projects worth of boilerplate patchwork that has been unevenly iterated on and used in some form during this time. i'm certain you'll find use for it, and i certainly will.

---

### quickstart
```bash
# create a new directory for your project
mkdir myproject; cd myproject

# initialize
npx @exajs/core init # with npm
bunx @exajs/core init # with bun

# start dev with auto reload
npm run watch # node.js
bun run watch # bun

# --or--

# start production
npm start # node.js
bun run start # bun
```
initializing will create the exa.js template project structure in the current directory. a brief description of this template is below.

---

### project template
- **config**  
*contains a `master.js` configuration file. this is used for project level configuration. for environment level configuration, it's recommended to use a `.env` file in the root and transfer relevant env using `process.env` in `master.js`.*

- **console**  
*contains console scripts that can be invoked with `npm run console <script name>`. see docs for proper format.*

- **http**  
*contains api logic organized in one or more files. each file contains route definitions, middleware, and handlers. see docs for proper format.*

- **library**  
*contains user defined library files. this is generally relevant js files for your project that don't fit anywhere else.*

- **middleware**  
*contains express.js compatible middleware. middleware is configured for use in api logic. see docs for proper format.*

- **migrations**  
*contains [jmig](https://github.com/realtux/jmig) compatible database migrations files. these are used to apply and rollback changes to a database. please see the jmig readme for usage specifics.*

- **models**  
*contains sequelize.js compatible database model files. to use a different database orm, set `database.use = false` in `config/master.js` which will disable automatic initialization of the `models` folder. see docs for proper format.*

- **public**  
*contains publicly available static files. in development, this is served with `express.static()` at base url `/public`. in production, this should be served with a normal web server.*

- **var**  
*contains variable static data, use this to store files that aren't directly used in your project, such as docs, sql files, notes, etc.*

- **views**  
*contains view templates for traditional non-async frontends. use `res.render(path, variables)` instead of `res.send()` in your api logic.*

- **websocket**  
*contains files that represent websocket connection entrypoints. see docs for proper format.*

---

### modularity options
the most amount of features are enabled by default since none of them clash. to disable a specific feature of your project and replace it with something else, set `use: false` for the corresponding key in `config/master.js`.

the following features can be disabled if desired:
- console
- http
- models (database)
- public
- views
- websocket

---

### configuration in development vs production with/without docker
exa.js is intended to be used with or without docker in both development and production. in either case it's useful to rely on configuration via `.env` for variables that differ between environments as a `.env` file can easily be made available to docker containers. configuration via `config/master.js` is useful for variables related to exa.js itself as well as variables that don't change between environments.

---

### environment
- **.env**  
a `.env` file in the root, if present, is evaluated and added to the environment of the running script at the time it is ran. any values placed in here are made available with `process.env.*` within your code. this is also very helpful if running your project within docker.
- **dev mode**  
exa.js runs in production mode by default. doing any of the following things will cause it to run in dev mode:
    - set `environment.development = true` in `config/master.js`
    - set `EXAENV=development` as an environment variable, typically in `.env`
