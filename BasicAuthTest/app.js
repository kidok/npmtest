var express = require('express');
var app = express();

var basicAuth = require('basic-auth');

var auth = function(req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };

    if (user.name === 'foo' && user.pass === 'bar') {
        return next();
    } else {
        return unauthorized(res);
    };
};

console.log(typeof app);

app.get('/', auth, function(req, res) {
    res.send("hello!");
});

app.listen(3000);
console.log('app is listening at port 3000');
