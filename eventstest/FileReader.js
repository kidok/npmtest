// var fs = require('fs');
// var EventEmitter = require('events').EventEmitter;
// var emitter = new EventEmitter();

// emitter.on('print', function(data) {
//     console.log(data);
// });

// emitter.on('error', function(error) {
//     console.log(error);
// });

// fs.readFile('./abc.html', 'utf8', function(err, data) {
//     if (err) {
//     	emitter.emit('error', err);
//     } else {
//     	emitter.emit('print', data);
//     }
// })
//"use strict";
//mistypedVaraible = 17;

var util = require('util');
var events = require('events');
var fs = require('fs');

function FileReader(file) {
    this._file = file;
    events.EventEmitter.call(this);
};

util.inherits(FileReader, events.EventEmitter);

FileReader.prototype.readFile = function() {
	var that = this;
    fs.readFile(this._file, 'utf8', function(err, data) {
        if (err) {
            that.emit('error', err);
        } else {
        	that.emit('print', data);
        };
    });
};

var myFileReader = new FileReader('./dddabc.html');

myFileReader.on('error', function(err){
	console.log(err);
});

myFileReader.on('print', function(data){
	console.log(data);
});

myFileReader.readFile();