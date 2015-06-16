var async = require('async');

var call_order = [];
// async.series([
//     function(callback) {
//         setTimeout(function() {
//         	console.log("aa");
//             call_order.push(1);
//             callback(null, 1);
//             return 55;
//         }, 25);
//     },
//     function(callback) {
//         setTimeout(function() {
//         	console.log("bb");
//             call_order.push(2);
//             callback(null, 2);
//         }, 50);
//     },
//     function(callback) {
//         setTimeout(function() {
//         	console.log("cc");
//             call_order.push(3);
//             callback(null,3);
//         }, 15);
//     }
// ], function(err, results) {
// 	console.log(call_order);
// 	console.log(results);
// });
async.waterfall([
    function(callback){
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback){
        console.log(arg1);
        callback(null, 'three');
    },
    function(arg1, callback){
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
   // result now equals 'done'    
});


// async.series([
//     function(callback){
//     	console.log("aa");
//         callback(new Error("dd"), "ddddd");
//     },
//     function(callback){
//     	console.log(arguments);

//         callback(null, 3);
//     }
// ],function(err, results) {
//     console.log("aa" + results);
// });