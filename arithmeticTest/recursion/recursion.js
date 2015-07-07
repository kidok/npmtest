function Recurser(n, callback) {
	callback(n);
    if (n == 1) {
        return 1;
    } else {
    	//console.log(n);
    	return Recurser(n-1, callback) + n;
    }
}

var result = Recurser(5, function(n){
	console.log(n);
});

console.log(result);