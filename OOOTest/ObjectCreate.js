//myobjectcreate equal to object.create
function MyObjectCreate(o){
	if(!(this instanceof MyObjectCreate)){
		return new MyObjectCreate();
		//or throw new Error("this is not the instance of MyObjectCreate")
	};

	var f = function(){};
	f.prototype = o;
	return new f();
}

var o1 = {
	val: 123
};

var o2 = new MyObjectCreate(o1);
console.log(o2.val);