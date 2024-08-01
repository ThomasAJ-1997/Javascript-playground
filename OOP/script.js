"use strict";

// OOP: Constructor Functions example
// There is practice constructor function names start with a capital letter.
const Person = function (firstName, birthYear) {
  // INSTANCE PROPERTIES
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method in a constructor function: bad practice. (use prototypal inheritance)
  //   this.calcAge = function () {
  //     console.log(2024 - this.birthYear);
  //   };
};

const myName = new Person("Thomas Jones", 1997);
console.log(myName);
// new calls the function, but it also does the following
// 1. New {} is created
// 2. Function is called and the function call, the THIS keyword is = {} the empty object.
// 3. {} is linked to the prototype. Creates __proto__ property.
// 4. The {} created in the beginning is returned from the constructor function.

const familyName = new Person("Emily Smith", 2001);
const familyNameTwo = new Person("John Smith", 1977);
console.log(familyName, familyNameTwo);

console.log(myName instanceof Person);
console.log("\n");

// Static method
Person.hey = function () {
  console.log("Hey there!");
  console.log(this);
};

Person.hey();

//////////////////////////////////////////////////////////////////////////////////////////////////
// PROTOTYPES (adding method)
Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};
console.log(Person.prototype);

myName.calcAge();
familyName.calcAge();
familyNameTwo.calcAge();

console.log(myName.__proto__);
console.log(myName.__proto__ === Person.prototype); // These are the same.
console.log(Person.prototype.isPrototypeOf(myName)); // True
console.log(Person.prototype.isPrototypeOf(Person)); // False
// Person.prototype is not the prototype of Person. bu as the prototype of all the objects created within the constructor function.

// Set properties on a prototype, not just methods
Person.prototype.species = "Homo Sapiens";
console.log(myName.species, familyName.species, familyNameTwo.species);

console.log(myName.hasOwnProperty("firstName")); // TRUE
console.log(myName.hasOwnProperty("species")); // FALSE
// Property isn't inside the myName object, so is false.

/////////////////////////////////////////////////////////////////////////////////
// Prototypal Inheritance
console.log(myName.__proto__);
console.log(myName.__proto__.__proto__);
console.log(myName.__proto__.__proto__.__proto__); // Null: top of the prototype chain

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 5, 6, 1, 1, 3, 5, 5, 5, 5, 6, 7];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const header1 = document.querySelector("h1");
console.dir(header1);

///////////////////////////////////////////////////////////////////////////////////
// ES6 Classess

// Class expressions
// const PersonCL = class {}

// Class declaration
class PersonCL {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Methods: will be added to the .prototype property
  calcAge() {
    console.log(2024 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2024 - this.birthYear;
  }
  // Set a property that already exists.
  set fullName(name) {
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} isn't a full name.`);
  }

  get fullName() {
    return this._fullName;
  }
  // stattic method
  static hey() {
    console.log("Hey there!");
    console.log(this);
  }
}

const thomas = new PersonCL("Thomas Jones", 1997);
console.log(thomas);
console.log(thomas.age);
thomas.calcAge();

console.log(thomas.__proto__ === PersonCL.prototype);

// PersonCL.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

thomas.greet();
console.log(thomas.fullName);
//////////////////////////////////////////////////////////////////////////////

// Setters and Getters: assesor properties: these are functions that get and set values
const wallie = new PersonCL("Wallie White", 1964);

const account1 = {
  owner: "Thomas",
  movements: [200, 5330, 120, 30],

  // Getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account1.latest);

account1.latest = 50;
console.log(account1.movements);

//////////////////////////////////////////////////////////////////////////////
// OBJECT CREATE
const personProto = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(personProto);
steven.name = "Steven";
steven.birthYear = "2001";
steven.calcAge();

console.log(steven.__proto__);
console.log(steven.__proto__ === personProto);

// Programmatic way
const sarah = Object.create(personProto);
sarah.init("Sarah", 1974);
sarah.calcAge();
