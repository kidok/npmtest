var express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    logger = require('morgan'),
    bodyParser = require('body-parser');

var app = express();

app.use(cookieParser('yoursecretcode'));
app.use(session({
    secret: 'yourothersecretcode',
    store: new mongoStore({
        host: 'localhost',
        prot: 27017,
        db: 'mongosession'
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
    res.send('session written in Mongodb successfully');
});

app.get('/session/get/', function(req, res) {
    if (req.session.redSession)
        res.send('the session value stored in Mongodb is: ' + req.session.redSession);
    else
        res.send("no session value stored in Mongodb ");
});

app.use('/', router);
var server = app.listen(8097, function() {
    console.log('Mongodb SESSION server is listening on port %d', server.address().port);
});
