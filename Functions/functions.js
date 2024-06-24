"use strict";
// Default Parameters
const bookingsArr = [];

const flightBooking = function (
  flightNumber,
  passangerNumber = 1,
  price = 199 * passangerNumber
) {
  const booking = {
    flightNumber,
    passangerNumber,
    price,
  };
  console.log(booking);
  bookingsArr.push(booking);
};

flightBooking("AIR123");
flightBooking("LH123", 2, 1200);
flightBooking("HWD123", 2, 500);
flightBooking("HWD123", 4);

// Can't skip - result (You can leave undefine as no entry.)
flightBooking("LH234", undefined, 1000);

/////////////////////////////////////////////////////////////////////
// Passing Arguments Value & Reference
const flight = "JGH345";
const jones = {
  name: "Thomas Jones",
  passport: 24739479284,
};

const checkIn = function (flightNumber, passenger) {
  flightNumber = "HK888";
  passenger.name = "Mr " + passenger.name;

  if (passenger.passport === 24739479284) {
    alert("Checked in");
  } else {
    alert("Wrong Passport!");
  }
};

// checkIn(flight, jones);
// console.log(flight);
// console.log(jones);

// Passing Objects with Functions
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000000);
};

newPassport(jones);
checkIn(flight, jones);

/////////////////////////////////////////////////////////
// Higher order Functions
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperCaseFirstWord = function (str) {
  const [firstWord, ...other] = str.split(" ");
  return [firstWord.toUpperCase(), ...other].join(" ");
};

// Higher order function: takes in another function
const transform = function (str, fn) {
  console.log(`Original string ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transform("JavaScript is the number 1 language", upperCaseFirstWord);
transform("JavaScript is the number 1 language", oneWord);

//Foreach example
// const highFive = function () {
//   console.log("👋");
// };
// document.body.addEventListener("click", highFive);

// ["Thomas", "Smith", "Adam"].forEach(highFive);
/////////////////////////////////////////////////////
// Functions returning functions
const helloFN = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}! Nice to meet you.`);
  };
};

const greetPerson = helloFN("Hey");
greetPerson("Thomas");
greetPerson("Sammantha");

helloFN("Hello")("Jones");

// Arrow function example
const greetArrowFN = (greeting2) => (name2) =>
  console.log(`${greeting2} ${name2}! Have a nice day.`);

greetArrowFN("Hi")("Gregory");
/////////////////////////////////////////////////////
// The Call & Apply Methods
const britishAirways = {
  airline: "British Airways",
  iataCode: "BA",
  bookings: [],
  book(flightNum, passengerName) {
    console.log(
      `Hi ${passengerName}. You've booked a seat on the ${this.airline} flight number${this.iataCode}${flightNum}.`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      passengerName,
    });
  },
};

britishAirways.book(239, "Thomas Jones");
britishAirways.book(492, "Mike Smith");
console.log(britishAirways);

// New airline
const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const bookFlight = britishAirways.book;

// book(23, "Sarah Willis"); = this won't work as the THIS keyword now points to underfined

// CALL METHOD
bookFlight.call(eurowings, 23, "Sarah Willis");
console.log(eurowings);

bookFlight.call(britishAirways, 453, "Mary Smith");
console.log(britishAirways);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

bookFlight.call(swiss, 583, "Andrew Jones");

// APPLY METHOD (not receives a lit of arguements but takes an Array)
// Apply isn't used much anymore in ES6
const flightData = [583, "George Cooper"];
bookFlight.apply(swiss, flightData);
console.log(swiss);

bookFlight.call(swiss, ...flightData); // Same as apply (Use call method and spread operator)
//////////////////////////////////////////////
// The Bind Method
const bookEW = bookFlight.bind(eurowings); // Return a new function
const bookBA = bookFlight.bind(britishAirways);
const bookSW = bookFlight.bind(swiss);
bookEW(23, "Steven Williams");

const bookEW23 = bookFlight.bind(eurowings, 23);
bookEW23("Harry Jones");
bookEW23("Sarah Preene");

// With event listeners.
// With Event Listeners
britishAirways.planes = 300;
britishAirways.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// britishAirways.buyPlane();

document
  .querySelector(".buy")
  .addEventListener("click", britishAirways.buyPlane.bind(britishAirways));

// Partial application (use case for BIND)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));
console.log(addVAT(232));
console.log(addVAT(345));

// Function return challenge
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(232));
console.log(addVAT2(345));
/////////////////////////////////////////////
// Invoked Function Expressions

(function () {
  //Wrap in ()
  console.log("This function will be removed when executed");
})();

(() => console.log("This arrow function will be removed when executed"))();

// Code Block: Data Privacy
{
  const isPrivate = 23;
  // Private variable' and cannot be accessed using let or const
  // Var however ignores the block and scope.
}

/////////////////////////////////////////////
// Closures
const secureBooking = function () {
  //Local Scope: Secure booking Scope
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passangers`);
  };
};

// Global execution context:
const bookingSystem = secureBooking();

bookingSystem(); //1 Passanger
bookingSystem(); //2 Passanger
bookingSystem(); //3 Passanger

// Variable environment of bookingSystem (Closure)
// console.dir(bookingSystem);

///////////////////////////////////////////////////////
// More Closure Case Examples: Identify them in code
// Example: Return a function from another function

// Example 01
let f; //Global Scope

const g = function () {
  // Closure: of variable environment
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  // F variable with be assigned again by the closure
  // F is now a different function compared to the code above.
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); //46 = (23 * 2);

h();
f(); //1554 = (777 * 2);

// The closure now has the value of B, not A at this point in time.
// console.dir(f);

// Example 2: A timer
const boardingPassangers = function (n, wait) {
  const perGroup = n / 3; // Closures have priority.

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passangers`);
    console.log(`There are three groups with ${perGroup} passasngers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};
const perGroup = 1000; //Closures have priority, not the scope chain.
boardingPassangers(180, 3);
