import sample from '#app/models/sample.js';

export default new class {

    routes = {
        'get /api/hello/world': 'world',
    }

    async world(req, res) {
        sample.model_method();

        return res
            .status(200)
            .send({
                message: 'hello world'
            });
    }

};
