var net = require('net');
var fs = require('fs');
var serializer = require('node-serialize');

var server = net.createServer(function(c){
	fs.writeFile('serverobj.json', serializer.serialize(c), function(){
		console.log("file write done");
	});

	console.log("client connected");
	c.on('end', function(){
		console.log("client disconected");
	});

	c.write('hello');
	c.pipe(c);
});

server.listen(8124, function(){
	console.log("server bound");
});