export default new class {

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
