var fs = require('fs');
var promise = require('Promise');
var q = require('q');

fs.readFile('file.txt','utf8', function(err,data){
	console.log(data);
});

function promisify(nodeAsyncFn, context) {
  return function() {
    var defer = q.defer()
      , args = Array.prototype.slice.call(arguments);
      
    args.push(function(err, val) {
      if (err !== null) {
        return defer.reject(err);
      }

      return defer.resolve(val);
    });

    nodeAsyncFn.apply(context || {}, args);

    return defer.promise;
  };
};

var fileReader = promisify(fs.readFile);
fileReader('file.txt').then(function(data){
	console.log(data);
}, function(err){
	console.log(err);
})