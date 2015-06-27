var Person = function(name) {
    if (this instanceof Person) {
        this.name = name;
    } else {
    	return new Person(name);
    };
};

Person.prototype.say = function() {
    console.log("hello, i am " + this.name);
};

function Student(name, subject) {
    Person.call(this, name);
    this.subject = subject;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.say = function() {
    console.log("hello, i am " + this.name + '. I am studying ' + this.subject);
};

var student1 = new Student("Janet", "Applied Physics");

student1.say();
