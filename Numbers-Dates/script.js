"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES: NUMBER
// Numbers are always represented as float/decimal in JavaScript
// For example:
console.log(23 === 23.0); // True

// Sometimes numbers can produce strange results in Binary base 2: 0.1

// Base 10 - 0 to 9
// Binary Base 2 - 0.1

// Because of limitations, JavaScript isn't the best suited for complex scientific and financial calculations/
// Errors such as this will happen: PHP and Ruby too have this problem.
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // false

console.log(Number("23"));
console.log(+"23"); // Type coersion: JavaScript does this when seeing the + sign.

// Parsing: Parse a number from a string.
// parseInt takes two  arguments: the parse string and the Redix: the base of the numerical system used.
console.log(Number.parseInt("30px", 10));
console.log(Number.parseInt("G67", 10)); // NaN: Needs to start with a Number/
console.log(Number.parseFloat("2.5rem"));

// isNan: Check if value is NaN
console.log(Number.isNaN(20)); // False
console.log(Number.isNaN("20")); // False
console.log(Number.isNaN(+"20X")); // True
console.log(Number.isNaN(23 / 0)); // False

// is Finite: check is value is a number (Best method to check if something is a number)
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20X"));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(20));
console.log(Number.isInteger("20"));
console.log(Number.isInteger(+"20X"));
console.log(Number.isInteger(23 / 0));
///////////////////////////////////////////////////////////////////////

// Math and Rounding
console.log(Math.sqrt(25)); //Square root
console.log(25 ** (1 / 2));

console.log(8 ** (1 / 3)); // Cubic Root

// Minimum, Maximum: Type coercion works but not parsing
console.log(Math.min(5, 18, 23, 11, "2"));
console.log(Math.max(5, 18, 23, 11, 2));

// Radius of a circle: How to calculate the area of the circle with 10px
console.log(Math.PI * Number.parseFloat("10px") ** 2);

// Random function
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
// 0...1   -> max - min -> min...(max)
console.log(randomInt(10, 20));

// Rounding: Integers
console.log(Math.trunc(23.3));

// Round to the nearest Integer
console.log(Math.round(23.3));
console.log(Math.round(23.9));

// Returns the smaller greater integer: 24
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3)); // rounded down to 23
console.log(Math.floor(23.9)); // rounded down to 23

console.log(Math.trunc(-23.3)); //  Trunc won't work with negative numbers.
console.log(Math.floor(-23.3)); // Floor rounding works in all situations regardless of postive or negatibe

// These have type coercion.

// Rounding: Decimals / floating point
console.log((2.7).toFixed(0)); // toFixed returns a string, not a number
console.log((2.7).toFixed(3)); // toFixed returns a string, not a number
console.log((2.345).toFixed(2)); // toFixed returns a string, not a number
console.log(+(2.345).toFixed(2));

// The Remainder Operator
// Returns the remainder of a divison
console.log(5 % 2);
console.log(5 / 2);

console.log(8 % 3);
console.log(8 / 3);

// Check if number is even or odd
// Even: When it is / by two
console.log(6 % 2); // 0
console.log(6 / 2); // 3 (Integer)

console.log(7 % 2);
console.log(7 / 2);

const isEven = (n) => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = "orangered";
    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});

// Numeric Seperators
const diameter = 287_46_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00; // Same numbers, but the seperators offer us different meanings
const transferFee3 = 1_500;

const PI = 3.14; // Can't use seperators at the beginning, end or by decimal point or two in a row.

// When converting string that have underscores to a number, it won't work.
// NaN will happen, and produce bugs in the code.

//////////////////////////////////////////////////////////////////
// BigInt

// Numbers are represented in 64bits. Only 53 are used to store the digits.
console.log(2 ** 53 - 1); // The biggest number JS can represent.
console.log(Number.MAX_SAFE_INTEGER); // Any number above this is unsafe and not accurate

// Big Integer can store numbers as large as you want.
console.log(7348757577589734895375893759375834585);
console.log(7348757577589734895375893759375834585n); //BigInt
console.log(BigInt(476823847893795375983758934758993573895));

// Operations
console.log(100000000000n + 10000000000000n);

console.log(
  2904820948209480942830484320482309834n * 39482094820948904034830438053485n
);

// Big Int cannot be mixed with other types and will create an error.
// The type has to to be convered to BigInt.
console.log(20n > 10);
console.log(20n == 20); // True
console.log(20n === 20); // False: This makes sense because the type isn't the same.
console.log(typeof 20n);

// You cannot convert bigInt can't be converted to number for example with sqrt.

console.log(10n / 3n);
console.log(10 / 3);
