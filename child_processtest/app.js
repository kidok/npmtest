var cp = require('child_process');

var n = cp.fork(__dirname + "/sub.js");

n.on('message', function(m){
	console.log("Parent got the message:" + m);
})

n.send({msg:"this message from parent sending"});

sub.js
process.on('message', function(m){
	console.log("Child got the message:" + m);
});

process.send({foo:"child"});
console.log(process.pid);