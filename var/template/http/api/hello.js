import { models } from '@exajs/core/database';

export default new class {

    routes = {
        'get /api/hello/world': 'world',
    }

    async world(req, res) {
        models.sample.model_method();

        return res
            .status(200)
            .send({
                message: 'hello world'
            });
    }

};
