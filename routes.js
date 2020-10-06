module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render(__dirname + '/static/index');
    });

    app.get('/testingcenters', function (req, res) {
        res.render(__dirname + '/static/treatment')
    });

    app.get('/game', function (req, res) {
        res.render(__dirname + '/static/ovochallenge')
    });

    app.get('/donate', function (req, res) {
        res.render(__dirname + '/static/donation/donate')
    });

    app.get('/cookietest', function (req, res) {
        res.cookie('test', 'cookie').send('cookie set');
    })
}
