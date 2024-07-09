"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// ARRAY METHODS
let testArr = ["a", "b", "c", "d", "e"];

// Slice Method: Extract part of array without affecting the original array
const newArray1 = testArr.slice(2);
const newArray2 = testArr.slice(2, 4);
const newArray3 = testArr.slice(-2);
const newArray4 = testArr.slice(-1);

console.log(newArray1);
console.log(newArray2);
console.log(newArray3);
console.log(newArray4);

// Slice can create a shallow copy of an array, or use spread operator;
console.log(testArr.slice());
console.log([...testArr]);

// Splice method: Changes the original and mutates the Array.
// console.log(testArr.splice(2));
testArr.splice(-1);
console.log(testArr);
testArr.splice(1, 2);
console.log(testArr);

// REVERSE
testArr = ["a", "b", "c", "d", "e"];
const testArr2 = ["j", "i", "h", "g", "f"];
console.log(testArr2.reverse());

// CONCAT
const letters = testArr.concat(testArr2);
console.log(letters);
console.log([...testArr, ...testArr2]);

// JOIN
console.log(letters.join(" - "));

//////////////////////////////////////////////////////
// The AT Method
const dummyArr = [23, 11, 64];
console.log(dummyArr[0]); // Old Version
console.log(dummyArr.at(0)); // New ES6 Version; don't need [] notation

// Getting the last element
console.log(dummyArr[dummyArr.length - 1]); // Old Version: Getting the last value.
console.log(dummyArr.slice(-1)[0]); // Another traditional method: Use slice and [] notations at the end
console.log(dummyArr.at(-1)); // New Version: Don't require slice or [] notation

// At method also works on Strings
console.log("Thomas".at(1));
console.log("Jones".at(2));

const firstInitial = "Thomas".at(0);
const lastInitial = "Jones".at(0);

const fullInitial = firstInitial + lastInitial;
console.log(fullInitial);
console.log("\n");

////////////////////////////////////////////////////////
// Looping Arrays: FOR EACH
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// For of loop
console.log("FOR OF LOOP");

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i}: You withdrawn ${Math.abs(movement)}`);
  }
}
console.log("\n");

console.log("FOREACH LOOP");

// For each loop
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i}: You withdrawn ${Math.abs(movement)}`);
  }
});

console.log("\n");

////////////////////////////////////////////////////////////////////
// FOREACH with maps and sets

// Maps
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const CurrenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(CurrenciesUnique);
CurrenciesUnique.forEach(function (value, key, set) {
  console.log(`${key}: ${value}`);
});

////////////////////////////////////////////////

// MAP Method
const movementsTwi = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUSD = 1.1;

// Programming paradigm: functional programming
const movementsUSD = movements.map(function (mov) {
  return mov * euroToUSD;
  // map method creates new array from the original with the euroToUSB variable calculation
});

// Arrow function version: one line of code: cleaner code
const movementsUSDArrow = movements.map((mov) => mov * euroToUSD);

console.log(movements);
console.log(movementsUSD);

// Same thing as above code as a for of loop
// const movementsUSDforOF = [];
// for (const mov of movements) movementsUSDforOF.push(mov * euroToUSD);
// console.log(movementsUSDforOF);

const movementsDesc = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);

console.log(movementsDesc);
console.log("\n");

//////////////////////////////////////
// Filter Method
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits); //Filter out withdraw
console.log("\n");

const withdrawal = movements.filter((mov) => mov < 0);
console.log(movements);
console.log(withdrawal);

// The Reduce Method
// The accumlator / current element / current index / array
const balance = movements.reduce(function (acc, curr, i, arr) {
  console.log(`Iteration number ${i}: ${acc}`);
  return acc + curr;
}, 0);

console.log("\n");

// Arrow function verions
const balanceArr = movements.reduce((acc, curr) => acc + curr, 0);

console.log(`Your balance is: ${balance}`);

// Maximum value with reduce method
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(`The maximum value is: ${max}`);

// Chaining methods
const euroToUSDConvert = 1.1;
// PIPELINE
const totalDespositUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * euroToUSD)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDespositUSD);
///////////////////////////////////////
// Find Method
const firstWithdrawel = movements.find((mov) => mov < 0);
console.log(movements);
console.log(firstWithdrawel);

console.log(accounts);

const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);

// Some Method
console.log(movements);

// INCLUDES: CHECKS EQUALITY
console.log(movements.includes(-130));

// SOME: CHECKS CONDITION
const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits);

// EVERY METHOD
console.log(movements.every((mov) => mov > 0));
console.log(account1.movements.every((mov) => mov > 0));

// FLAT and FLAT MAP METHOD
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrNested = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrNested.flat); // The flat only goes one level deep when trying to flat the array.

console.log(arrNested.flat(2)); // This will flat the array

// Sort Movements
const owners = ["Thomas", "Sam", "Adam", "Martha"];
console.log(owners.sort);

// Creating and filling arrays
const arrY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9));

// Creating arrays programatically
const arrX = Array(7);
console.log(arrX); // Seven empty arguments

arrX.fill(1, 3, 5);
console.log(arrX);

const arrZ = Array.from({ length: 7 }, () => 1);
console.log(arrZ);

const arrZZ = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(arrZZ);
