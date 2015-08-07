var Redis = require('ioredis');
var redis = new Redis();

console.time('t1');
redis.set('foo','bar');
redis.get('foo');
console.timeEnd('t1');