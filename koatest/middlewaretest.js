var koa = require('koa');
var app = koa();

// x-response-time
app.use(function *(next){
  // (1) 进入路由
  var start = new Date();
  yield next;
  // (5) 再次进入 x-response-time 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date() - start;
  //this.set('X-Response-Time', ms + 'ms');
  console.log('test1 ms:' + ms);
  // (6) 返回 this.body
});

console.log('test');
// logger
app.use(function *(next){
  // (2) 进入 logger 中间件
  var start = new Date();
  yield next;
  // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date() - start;
  console.log('test2 ms:' + ms);
  //console.log('%s %s - %s', this.method, this.url, ms);
});

// response
app.use(function *(){
  // (3) 进入 response 中间件，没有捕获到下一个符合条件的中间件，传递到 upstream
  this.body = 'Hello World';
  console.log(this);
  console.log('test3 url: ' + this.url);
});

app.listen(3000);