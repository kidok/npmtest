var express = require('express');
var router = express.Router();
function MiduoRouter(){

}

MiduoRouter.prototype = Object.create(router.prototype);
var infoRouter = new MiduoRouter();


var aa = 123;
debugger;
setTimeout(function(){
	var bb = 222;
	console.log('message');
	debugger;
}, 1000);
console.log(aa);
console.log(typeof router);
