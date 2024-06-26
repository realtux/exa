export default new class {

    routes = {
        'get /home': 'home',
    }

    async home(req, res) {
        return res
            .status(200)
            .render('sample.html', {
                name: 'exa.js'
            });
    }

};
