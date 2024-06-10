export default new class {

    routes = {
        'get /api/hello/world': 'world',
    }

    world(req, res) {
        return res
            .status(200)
            .send({
                message: 'hello world'
            });
    }

};
