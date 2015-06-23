var username = 'foo';
var password = 'bar';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
var http = require('http');
var url = require('url');

// auth is: 'Basic VGVzdDoxMjM='
var options = url.parse('http://localhost:3000');
options.headers = {};
options.headers.Authorization = auth;

console.log(options);

http.get(options, function(res) {
    var data = '';
    res.on('data', function(chunk) {
        data = data + chunk
    });
    res.on('end', function(){
    	if(data){
    		console.log(data);
    	};    	
    });
});
