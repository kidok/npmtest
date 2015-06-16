// console.log('start');
// process.nextTick(function() {
//     console.log('nextTick callback');
// });

// setTimeout(function() {
//     console.log('aaa')
// }, 0);

// console.log('scheduled');

// console.log('bbb');

// process.on('uncaughtException', function(err) {
//     console.error('Error caught in uncaughtException event:', err);
// });

// try {
//     process.nextTick(function() {
//         fs.readFile('non_existent.js', function(err, str) {
//             if(err) throw err;
//             else console.log(str);
//         });
//     });
// } catch(e) {
//     console.error('Error caught by catch block:', e);
// }
var d = require('domain').create();
var events = require('events');

// process.on('uncaughtException', function(err) {
//     console.error('Error caught in uncaughtException event:', err);
// });

// d.on('error', function(err) {
//     console.error('Error caught by domain:', err);
// });

// d.run(function() {
//     process.nextTick(function() {
//         fs.readFile('non_existent.js', function(err, str) {
//             if(err) throw err;
//             else console.log(str);
//         });
//     });
// });

var e = new events.EventEmitter();

d.on('error', function(err) {
    console.error('Error caught by domain:', err);
});

e.on('data', function(err) {
    if(err) throw err;
});

if(Math.random() > 0.5) {
    d.run(function() {
        e.emit('data', new Error('Error in domain runtime.'));
    });
} else {
    e.emit('data', new Error('Error without domain.'));
}

var app = express();
var server = require('http').create(app);
var domain = require('domain');
 
// 使用 domain 来捕获大部分异常
app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function () {
        try {
            var killTimer = setTimeout(function () {
                process.exit(1);
            }, 30000);
            killTimer.unref();
 
            server.close();
 
            res.send(500);
        } catch (e) {
            console.log('error when exit', e.stack);
        }
    });
 
    reqDomain.run(next);
});
 
// uncaughtException 避免程序崩溃
process.on('uncaughtException', function (err) {
    console.log(err);
 
    try {
        var killTimer = setTimeout(function () {
            process.exit(1);
        }, 30000);
        killTimer.unref();
 
        server.close();
    } catch (e) {
        console.log('error when exit', e.stack);
    }
});