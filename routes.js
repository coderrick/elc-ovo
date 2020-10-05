module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render(__dirname + '/static/index');
    });

    app.get('/testingcenters', function (req, res) {
        res.render(__dirname + '/static/treatment')
    });

    app.get('/cookietest', function (req, res) {
        res.cookie('test', 'cookie').send('cookie set');
    })
}
