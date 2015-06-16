var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session');
 
var app = express();
app.use(logger("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('yousecretcode'));
app.use(expressSession({secret: 'yourothersecretcode', saveUninitialized: true, resave: true}));
 
var router = express.Router();
 
router.get('/session/set/:value', function(req, res) {
	req.session.mySession = req.params.value;
	res.send('session write success');
});
 
app.get('/session/get/', function(req, res) {
	if(req.session.mySession){
		console.log(req.session);
		res.send('the session value is: ' + req.session.mySession);
	}		
	else
		res.send("no session value");
});
 
app.use('/', router);
var server = app.listen(8097, function() {
	console.log('BASIC SESSION server is listening on port %d', server.address().port);
}); 