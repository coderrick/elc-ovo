var Twit = require('twit');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render(__dirname + '/static/index');
    });

    app.get('/testingcenters', function (req, res) {
        res.render(__dirname + '/static/treatment')
    });

    app.get('/tweets', function(req,res){
        var T = new Twit({
            consumer_key:         'Y0pcKq45wPkO2g4MmkOibpizO',
            consumer_secret:      '5AmbiFNUR2j3xsErxHK1Jwno3xdE7u9dqAnlABwXa8vwGA7REW',
            access_token:         '1313174331598479363-1VYU2OBP8L8hsmBFmWbN3DynbVcXd7',
            access_token_secret:  'Fr0aYOWohtEgCQmoc1pphr8qcxlek5srq4HOGpI6pIcBP',
          })
        
          T.get('search/tweets', { q: '#ELCExperiences', count: 100 }, function(err, data, response) {
              if(err) res.json(errr);
            console.log(data)
            res.json(data)
          })
    })

    app.get('/sharestory', function (req, res) {
        res.render(__dirname + '/static/story')
    })

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
