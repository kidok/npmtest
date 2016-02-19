const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('<html>\n<head><link rel="shortcut icon" href="about:blank"></head><body><div>hello</div></body></html>');
}).listen(port, hostname, () => {
  console.log('Server running at http://${hostname}:${port}/');
});