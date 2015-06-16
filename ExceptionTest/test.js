// var testFunction=function(){  
// console.log("callback function executed.");  
// }  
// var timer=setInterval(testFunction,3000);  
// timer.unref();
// //timer.ref();
 var fs = require('fs');

// process.on('uncaughtException', function(error){
// 	console.log(error);
// })

// try{
// 	fs.readFile('non_existent.js', function(err, str) {
//             if(err) throw err;
//             else console.log(str);
//         });
// }
// catch(e){
// 	console.log("general error: ", e.stack);
// }

var domain=require("domain");
module.exports = function(func){
    var F = function(){};
    var dom = domain.create();
    F.prototype.catch = function(errHandle){
        var args = arguments;
        dom.on("error",function(err){
            return errHandle(err);
        }).run(function(){
            func.call(null,args);
        });
        return this;
    }
    return new F();
};


var d = require('domain').create();


process.on('uncaughtException', function(err) {
    console.error('Error caught in uncaughtException event:', err);
});

d.on('error', function(err) {
    console.error('Error caught by domain:', err);
});

d.run(function() {
    process.nextTick(function() {
        fs.readFile('non_existent.js', function(err, str) {
            if(err) throw err;
            else console.log(str);
        });
    });
});