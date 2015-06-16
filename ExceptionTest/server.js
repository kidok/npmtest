// Require Dependencies
var express = require('express');
var app = express();
var fs = require('fs');
var errorhandler = require('errorhandler')

// Routes
app.get('/', function(request, response) {
     fs.readFile('non_existent.js', function(err, str) {
            if(err) throw err;
            else console.log(str);
        });
    response.send('Hello World!');
});

// you need this line so the .get etc. routes are run and if an error within, then the error is parsed to the ned middleware (your error reporter)
// app.use(function(err, req, res, next) {
//     if(!err) return next(); // you also need this line
//     console.log("error!!!");
//     res.send("error!!!");
// });
//app.use(errorhandler);
app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function () {
        try {
            var killTimer = setTimeout(function () {
                process.exit(1);
            }, 30000);
            killTimer.unref();
 
            server.close();
 
            res.send(500);
        } catch (e) {
            console.log('error when exit', e.stack);
        }
    });
 
    reqDomain.run(next);
});

// Listen
app.listen(5000, function() {
  console.log("Listening on 5000");
});