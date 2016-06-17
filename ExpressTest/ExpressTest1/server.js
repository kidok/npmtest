var express = require('express');
var app = express();

class Sleeper {
    constructor(name, ms) {
        this.name = name;
        this.ms = ms;
    };

    sleep() {
        let start = new Date().getTime(),
            expire = start + this.ms;
        while (new Date().getTime() < expire) { }
        return;
    };
};

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    let s1 = new Sleeper("s1", 2000);
    s1.sleep();
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(JSON.stringify(req.headers));
    console.log(req.headers);
});

app.listen(3300);