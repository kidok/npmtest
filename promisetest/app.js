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

