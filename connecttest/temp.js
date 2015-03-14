nettest server.js
var net = require('net');
var fs = require('fs');

var server = net.createServer(function(c){
	fs.writeFile('serverobj.txt', c.toString(), function(){
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


client.js
var net = require('net');
var option = {
	port: 8124
}
var client = net.connect(option, function(){
	console.log("connected to server");
	client.write("world");
});

client.on('data', function(data){
	console.log(data.toString());
	client.end();
});

client.on('end', function(){
	console.log("disconnnected from server");
});

client.on('error', function(){
	console.log("error happened on client si");
})


websocket.js
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
        }
        console.log(message);
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});
