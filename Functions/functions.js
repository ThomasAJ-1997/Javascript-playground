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
