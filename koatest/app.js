'use strict'
var koa = require('koa');
var app = koa();

app.use(function* (){
   this.body = "hello world"; 
});

app.listen(3000);

//https://github.com/guo-yu/koa-guide




