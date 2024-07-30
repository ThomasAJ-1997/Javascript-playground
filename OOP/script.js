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
// 3. {} is linked to the prototype.
// 4. The {} created in the beginning is returned from the constructor function.

const familyName = new Person("Emily Smith", 2001);
const familyNameTwo = new Person("John Smith", 1977);
console.log(familyName, familyNameTwo);

console.log(myName instanceof Person);
console.log("\n");

//////////////////////////////////////////////////////////////////////////////////////////////////
