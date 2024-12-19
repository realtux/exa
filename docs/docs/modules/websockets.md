---
sidebar_position: 2
---

# websockets

this module is used for exposing urls that upgrade to websocket connections.

## concept

zero or more files are created in the `websocket` directory. each file is intended to be used for a single url that upgrades to websocket. the file can be named anything and has no effect on functionality. all files in the `websocket` folder will be loaded and processed when `exa.js` starts.

## internal handling

the websocket server implementation is handled using the well known and trusted `ws` module. this module largely just wraps `wss.on('connection', callback)`. connections are upgraded from regular http requests rather than running entirely separate servers on separate ports. this makes enabling websockets very easy.

## file structure

a websocket handler looks like this:

```js title="websocket/handler.js"
export default new class {

    // optional, defines route to handle
    route = '/'

    // will be called for each websocket connection that is established
    connection(socket, req) {
        console.log('new connection');

        socket.on('message', data => {
            console.log('new message', data);
        });

        socket.on('close', () => {
            console.log('connection closed');
        });

        socket.on('error', err => {
            console.log('ws error', err);
        });
    }

}
```

`route` is optional and defaults to `/` if not supplied. this variable makes it possible to run separate servers on separate urls. whether this is useful or not depends on what you are building.

the `connection` callback is called on each new connection with `socket` referring to the native `ws` socket object and `req` representing the http request that was received prior to upgrading.

a very basic set of event listeners is provided in the example. for all options, please refer to the `ws` documentation.
