var express = require('express'),
    redis = require('redis'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redisStore = require('connect-redis')(session),
    logger = require('morgan'),
    bodyParser = require('body-parser');

var client = redis.createClient(), //CREATE REDIS CLIENT
    app = express();

app.use(cookieParser('yoursecretcode'));
app.use(session({
    secret: 'yourothersecretcode',
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: client
    }),
    saveUninitialized: false, // don't create session until something stored,
    resave: false // don't save session if unmodified
}));

app.use(logger("tiny"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var router = express.Router();

router.get('/session/set/:value', function(req, res) {
    req.session.redSession = req.params.value;
    res.send('session written in Redis successfully');
});

app.get('/session/get/', function(req, res) {
    if (req.session.redSession)
        res.send('the session value stored in Redis is: ' + req.session.redSession);
    else
        res.send("no session value stored in Redis ");
});

app.use('/', router);
var server = app.listen(8097, function() {
    console.log('REDIS SESSION server is listening on port %d', server.address().port);
});