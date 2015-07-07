var fs = require('fs');
var path = require('path');

function ResursedFiler(dir, callback) {
    fs.readdirSync(dir).forEach(function(file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            ResursedFiler(pathname, callback);
        } else {
            callback(pathname);
        }
    });
};

var i = 0
ResursedFiler('/Users/jameschen/Technology/nodejs/npmtest', function(pathname){
	console.log(pathname);
	i++;
});

console.log(i);

function AsyncResursedFiler(dir, callback) {
    fs.readdir(dir, function(err, files) {
        files.forEach(function(file) {
                console.log(file);
                var pathname = path.join(dir, file);
                if (fs.statSync(pathname).isDirectory()) {
                    ResursedFiler(pathname, callback);
                } else {
                    callback(pathname);
                }
            })
            //console.log(dir);
            // (function(f){
            // 	//var pathname = path.join(dir)
            // 	console.log(dir);
            // 	var pathname = path.join(dir, f);
            // 	console.log(pathname);
            // 	// if(fs.statSync(pathname).isDirectory()){
            // 	// 	//AsyncResursedFiler(pathname, null);
            // 	// }else{

        // 	// }
        // })(file);
    })
};

// var a = 0
// AsyncResursedFiler('/Users/jameschen/Technology/nodejs/npmtest', function(pathname){
// 	console.log(pathname);
//     a++;
//     console.log(a);
// });

// console.log(a);

