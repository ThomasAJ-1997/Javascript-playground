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
////////////////////////////////////////////////////////////////////////////
// Another Class Examples
class Account {
  // 1. Public Fields (added to instances)
  locale = navigator.language;

  // 2. Private fields: Hashtag makes
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // The code below works. Doesn't need to be in constructor.
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`);
  }
  // Public Interface: Methods are added to the prototype
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved.`);
      return this;
    }
  }

  // Private Methods
  #approveLoan(val) {
    return true;
  }
}
const acc1 = new Account("Jones", "GBP", 1111);

// This isn't a good idea, create methods to do this functionality,
// acc1._movements.push(250);
// acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(130);
acc1.requestLoan(1000);

console.log(acc1.getMovements);
console.log(acc1);
// console.log(acc1.#approveLoan(100));
// console.log(acc1.#pin);
// console.log(acc1.#movements); // Can't access outside of class.

// Encapsulation needed: This keeps property and methods private and aren't accessible outside the class, not in the public interface. We need data privacy to prevent code from being manipulated that shouldn't be accessed outside the class, the second reason we can feel more confident doing internal changes without breaking code. A programming convention _approveDeposit is a way to signal to developers this is a private field you shouldn't manipulate outside the class.

// Private Class Fields: Improving and changing classes in JavaScript. In OOP, properties are called fields which means JavaSript is moving away from Classes being syntax sugar with constructor functions.

// Four different fields: Public Fields / Private Fields / Public Methods / Private Methods

////////////////////////////////////////////////////////////////////////////////////
// Chaining Methods with classes

acc1.deposit(300).deposit(120).withdraw(35).requestLoan(25000).withdraw(4000);

///////////////////////////////////////////////////////////////////////////////////
