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
