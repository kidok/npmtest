var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

console.log(cluster.isMaster);
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
    console.log("fork()");
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
    console.log("server is starting");
  }).listen(8000);
}

console.log("done");