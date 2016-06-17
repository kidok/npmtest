
var http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  console.log('time' + Date.now());
  res.end('Hello World2333');
}).listen(5000);