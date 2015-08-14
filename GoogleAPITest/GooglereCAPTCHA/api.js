var fs = require('fs');
var http = require('http');
http.createServer(function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            console.log(jsonString);
            fs.writeFileSync("a.txt", jsonString, 'utf8');
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('post successfully\n');
        });
    }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

