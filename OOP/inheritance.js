// Inheritance between 'classes': Constructor Functions

"use strict";

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduction = function () {
  console.log(
    `My name is ${this.firstName}, I am ${this.birthYear} year's old and I study ${this.course}`
  );
};

const michael = new Student("Michael", 2001, "Computer Science.");
console.log(michael);
michael.introduction();
michael.calcAge();

Student.prototype.constructor = Student;
console.log(michael instanceof Student);
console.log(michael instanceof Person);
console.log("\n");
//////////////////////////////////////////////////////////////////////

// Inheritance between 'classes': ES6 Classes

class PersonCL {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2024 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2024 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log("Hey there");
  }
}

class StudentCL extends PersonCL {
  constructor(fullName, birthYear, course) {
    // This needs to happen first: This is responsible for creating the THIS keyword.
    super(fullName, birthYear);
    this.course = course;
  }
  introduction() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const martha = new StudentCL("Martha Jones", 2012, "Computer Science");
console.log(martha);
martha.introduction();
martha.calcAge();
//////////////////////////////////////////////////////////////////////

// Inheritance between 'classes': Object.create

const PersonProto = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduction = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2000, "Computer Science");
jay.introduction();
jay.calcAge();
