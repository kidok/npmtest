var connect = require("connect");
var http = require("http");

var app = connect();


app.use(function(request, response, next) {  
    console.log("In comes a " + request.method + " to " + request.url);  
    next();  
});

//app.use(connect.logger());

app.use(function(request, response) {  
    response.writeHead(200, { "Content-Type": "text/plain" });  
    response.end("Hello world!\n");  
}); 

http.createServer(app).listen(1337); 