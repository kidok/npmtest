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