var http = require('http');
var Step = require('./a/step');
var fs = require('fs');
// Step(
//  function Step1(){
//      return "step1result"
//  },
//  function Step2(err, text){
//      console.log(text);
//  }
// // );
// function callbackfun() {
//     setTimeout(function() {
//         return "aaaa"
//     }, 5000);
// }

// Step(
//     function readSelf() {
//         //fs.readFile(__filename, 'utf8', this);
//         //http.request('http://localhost:3005/api/users?userName=admin100', this);
//         http.get("http://localhost:3005/api/users?userName=admin100", this);
//         //callbackfun(this);
//     },
//     function capitalize(res) {
//         res.on('data', function(data) {
//             console.log(JSON.parse(data));
//         })
//         console.log(res.statusCode);
//     }
//     // function showIt(err, newText) {
//     //     if (err) throw err;
//     //     console.log(newText);
//     // }
// );
// console.log("dddddddd");

// function sleep(time, callback) {
//     var stop = new Date().getTime();
//     while (new Date().getTime() < stop + time) {;
//     }
//     callback();
// }

// sleep(1000, function() {
//     // executes after one second, and blocks the thread
// });

// console.log("done");

// http.request('http://localhost:3005/api/users?userName=admin100', function(res){
//  console.log(res.statusCode);
// });

// http.get("http://localhost:3005/api/users?userName=admin100", function(res) {
//   console.log("Got response: " + res.statusCode);
// });
// fs.readFile(__filename, 'utf8', function(error, text){

// });

// var req = http.request('http://localhost:3005/api/users?userName=admin100', function(res) {


//     //console.log(res);
//     res.on('data', function(chunk) {
//         console.log('BODY: ' + chunk);
//     });

// }).on('error', function(e) {
//     console.log("Got error: " + e.message);
// });

// req.end();

// passport.use('local-login', new localStrategy({
//             userNameField: 'username',
//             passwordField: 'password',
//             passReqToCallback: true
//         },
//         function(req, username, password, done) {
//             //console.log("passport local strategy is called");
//             //implement verification logic here
//             http.get("http://localhost:3005/api/users?userName=admin100", function(res) {
//                 res.on('data', function(data) {
//                     console.log(JSON.parse(data));
//                     //JSON.parse(data);
//                     if(data){
//                      return done(null, data);
//                     }
//                     return done(null, false, req.flash('message', '用户名或密码不正确'));
//                 });
//             });
//             // var val = user.login(username, password)

//             // if (val)
//             //     return done(null, val);
//             // else
//             //     return done(null, false, req.flash('message', '用户名或密码不正确'))
//         }));


function login() {
    http.get("http://localhost:3005/api/users?userName=admin100", function(res) {
        res.on('data', function(data) {
            var user = JSON.parse(data);
            console.log(user);
            //JSON.parse(data);
            return user;
        });
    });
}

var val = login();

console.log(val);