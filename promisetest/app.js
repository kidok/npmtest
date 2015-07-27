var Promise = require('promise');
var Q = require('q');
var FS = require('fs');

Q.nfcall(FS.readFile, "file.txt", "utf-8")
    .then(function(data) {
        console.log(data);
    })
    .fail(function(err) {
        console.log('Error: ' + err);
    })
    .done(function() {
        console.log("done");
    });

var promise = new Promise(function(resolve, reject) {
    FS.readFile('file.txt11', function(err, data) {
        if (err) {
            reject;
        } else {
            resolve;
        }
    })
});

promise.then(console.log('success'));

var promise = new Promise(function(resolve, reject) {
    resolve(1);
});

var defer = promise.then(function(val) {
    console.log(val); // 1
    return val + 2;
});

console.log(defer instanceof Promise);

console.log(Promise.defered);
defer.then(function(val) {
    console.log(val); // 3
    return val + 1;
}).then(function(val) {
    console.log(val + 1);
})
