var EventProxy = require('eventproxy');
var ep = new EventProxy();
var fs = require('fs');



fs.readFile('a1.txt', function(err, content) {

	setTimeout(function(content){
		console.log(content.toString('utf8'));
		ep.emit('reada1', content);
	}, 3000, content);
	
    
    //console.log('reada1 done');
});
	
fs.readFile('a2.txt', function(err, content) {
    ep.emit('reada2', content);
    console.log('reada2 done');
});

var p = ep.all('reada1','reada2', function(c1, c2){
	console.log('a1 and a2 are all done');
	console.log(c1 + c2);
});

console.log(p);