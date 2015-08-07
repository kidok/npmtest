var mongoose = require('mongoose');

var options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 90000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 90000
        },
        rs_name: 'rs0'
    }
};

var uri = "mongodb://localhost:27017,localhost:27018,localhost:27019";

mongoose.connect(uri, options);

var Cat = mongoose.model('Cat', {
    name: String
});

var kitty = new Cat({
    name: 'Zildjian2'
});
kitty.save(function(err) {
    if (err) // ...
        console.log(err);
});
