var express = require("express");
var app = express();
var router = express.Router();

router.use(function(res, req, next){
	console.log(res);
	next();
})

router.get("/", function(req, res){
	res.json({"name":"james","year": 32})
})

app.use("/api", router);

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})