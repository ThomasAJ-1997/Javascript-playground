"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

// Destructuring - A ES6 feature to break down, retreiving and collecting data from a complex data structure to a more simpler version by storing in a variable.

// old version
const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Destructuring method
const [x, y, z] = arr;
console.log(x, y, z);

// Destructuring from Array
let [first, secondary] = restaurant.categories;
console.log(first, secondary);

// Switch two variables
[first, secondary] = [secondary, first];
console.log(first, secondary);

// Function to order food (return)
const [starter, main] = restaurant.order(2, 0);
console.log(`Your order is a starter of ${starter} and a main of ${main}`);

// Nested Array example
const nestedArr = [2, 4, [5, 6]];
const [i, , [j, k]] = nestedArr; //(all numbers besides 4);
console.log(i, j, k);

// An array we don't know the length of. Real world example
// 1 will appear when the array is ended.
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
