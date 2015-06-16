#! /usr/bin/env node
 // var fs =require('fs');
// var path = process.cwd();

// fs.readdir(path, function(error, files){
// 	if(error){
// 		return console.log(error);
// 	}	

// 	for (var i = files.length - 1; i >= 0; i--) {
// 		console.log(files[i]);
// 	};
// })
var http = require('http');

var options = {
  host: 'www.google.com',
  path: '/index.html'
};

// var options = {
//     host: 'secure.newegg.com',
//     path: '/Shopping/ShoppingCart.aspx'
// };

var req = http.get(options, function(res) {
    // res.setEncoding('utf8');
    console.log("Got response: " + res.statusCode);
    res.on('data', function(chunk) {
        console.log(chunk);
    }).on('end', function() {
        console.log('request is end');
    });
});

req.on('error', function(e) {
    console.log("Got error: " + e.message);
});