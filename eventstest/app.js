var events = require('events');
var eventEmitter = new events.EventEmitter();
var util = require("util");

function doorRing(){
	console.log("ring ring ring");	
}

eventEmitter.on("open", doorRing);

eventEmitter.emit("open");

function Door(colour){
	this.colour = colour;
	//call EventEmitter contructor,like base
	events.EventEmitter.call(this);
	this.OpenDoor = function(){
		this.emit("Open");
	}
}

Door.prototype.__proto__ = events.EventEmitter.prototype;

console.log("==========");
console.log(Door.prototype);
console.log(Door.prototype.__proto__);
var aa = {};
console.log(aa.__proto__);
console.log("==========");
//inherits
//util.inherits(Door, events.EventEmitter);

var frontDoor = new Door("brown");
//var frontDoor = {}
//frontDoor.__proto__ = Door.prototype
//Door.call(frontDoor)
frontDoor.on("Open", doorRing);

console.log(frontDoor);



console.log(require("util").inspect(frontDoor.listeners("Open")));
frontDoor.removeAllListeners("Open");
frontDoor.OpenDoor();
