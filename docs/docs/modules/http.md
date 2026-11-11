---
sidebar_position: 2
---

# http

this module is used for exposing http routes for use in apis and other purposes.

## concept

files are organized within the `http` directory in any manner desired. a common pattern used is to have directories in the same structure that your urls will ultimately be, however, this is entirely up to you. exa.js on start will process all files recursively that are present in the `http` directory.

## internal handling

http server and routes and implemented using express.js, a well known and trusted http server. everything express.js supports is also supported in exa.js.

## anatomy of an http file

the following is the structure of an http file

```js title="http/sample.js"
import authorized from '#app/middleware/authorized.js';

export default new class {

    routes = {
        'get /hello/world': 'world',
    }

    middleware = {
        '*': [authorized]
    }

    async world(req, res) {
        return res
            .status(200)
            .send({
                message: 'hello world'
            });
    }

};
```

### routes

each route is a key composed of the http method and route path or pattern with a string value of the name of the method it should call. because this just wraps express.js internally, it supports everything express.js supports, including:

basic routes
```js
routes = {
    'get /hello/world': 'world',
}
```

regex routes
```js
routes = {
    'get /pets/(dog|cat)': 'pet',
}
```

param routes
```js
routes = {
    'get /blogs/:blog_id': 'get_blog',
}
```

### middleware

one or more pieces of middleware can be ran prior to the route method being called. this middleware is great for many purposes such as authentication, setting context variables, or performing pre-route logic.

a middleware file looks like this:

```js title="middleware/authorized.js"
export default async (req, res, next) => {
    // middleware logic
    if (req.headers.authorization !== 'abc123') {
        return res
            .status(401)
            .send();
    }

    return next();
};
```

this middleware checks an api key to see if it's the right value. if it's not, a 401 unauthorized response is received, otherwise `next()` is called which either calls the next middleware in the chain or calls the route method.

to use middleware, add key/value pairs to the `middleware` object. the key should be the method name and the value should be an array of middleware to run.

```js
// apply authorized middleware to all routes
middleware = {
    '*': [authorized],
}

// apply authorized middleware to one route
middleware = {
    hello: [authorized],
}

// apply authorized middleware to all routes except for hello
middleware = {
    '*': [authorized],
    hello: []
}

// apply common and authorized middleware to all routes
middleware = {
    '*': [common, authorized],
}
```

middleware precedence is top to bottom. this is why everything works in the third example. `hello` has a value of blank array.

## request parsers

each parser reads its limits from `http`. `json`, `urlencoded`, `text`, and `raw` default to a `max_size` of `256kb`. `http.json.strict` defaults to `true`. `http.urlencoded` defaults to `extended: true` and `parameter_limit: 1000`.

### application/json

`req.body` is populated with the parsed version of the request.

```json
{"name": "exa", "type": "framework"}
```

is parsed into

```js
{
    name: 'exa',
    type: 'framework'
}
```

### application/x-www-form-urlencoded

`req.body` is populated with an object of key/value pairs representing the request.

```
?name=exa&type=framework
```

is parsed into

```js
{
    name: 'exa',
    type: 'framework'
}
```

### multipart/form-data

same as above, `req.body` is populated with an object of key/value pairs representing the request **for only non-files**. `exa.js` uses [multer](https://www.npmjs.com/package/multer) middleware for `multipart/form-data` requests. files are kept in memory. `http.uploads.max_size` is the largest file that will be accepted, and the default is 64mb. `http.uploads.max_files` is how many files one request can include, and the default is 10. `http.uploads.adapter` is `memory` for now.

for `multipart/form-data` requests, `req.files` is populated with an array of objects each representing an uploaded file. for example, a file uploaded with the name `cat` would cause `req.files` to look like this:

```js
[
    {
        fieldname: 'cat',
        originalname: 'cool_cat.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: <Buffer ff d8 ff e1 7f ... 1024 more bytes>,
        size: 7972467
    }
]
```

## sessions

when `session.use` is `true` in `config/master.js`, every route handler and middleware receives `req.session`. read a value off it, or set a value to store it for the next request from the same browser. the session id is kept in the cookie named by `session.name`.

```js title="http/account.js"
export default new class {

    routes = {
        'post /login': 'login',
        'get /me': 'me',
    }

    async login(req, res) {
        req.session.user_id = 5;

        return res
            .status(200)
            .send({ ok: true });
    }

    async me(req, res) {
        return res
            .status(200)
            .send({
                user_id: req.session.user_id ?? null,
            });
    }

};
```

a session is saved when the handler changes it. reading `req.session` without setting anything does not create a cookie. `session.adapter` currently supports `memory` only, which stores sessions in the process. the cookie options live under `session.cookie`. `secure` defaults to `false` so the cookie is sent over plain http.

a thrown route or middleware is logged and the client receives json. the process stays up.
