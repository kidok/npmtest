var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect("mongodb://localhost/rest_test");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', require('./routers/api'));

app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
