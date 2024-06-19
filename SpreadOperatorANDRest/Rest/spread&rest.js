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

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },
};

const arr = [7, 8, 9];

const spreadOperator = [1, 2, ...arr]; //Spread operator (comma)
console.log(spreadOperator);
console.log(...spreadOperator); // Individual values (no commas)

const newMenu = [...restaurant.mainMenu, "Gnocci", "Trout"];
console.log(newMenu);

// Uses cases: create sallow copies & merge arrays
const mainMenuCopy = [...restaurant.mainMenu]; // Copy Array

const mainMenuJoin = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(mainMenuJoin);

const mainMenuConcat = [...restaurant.starterMenu].concat(restaurant.mainMenu);
console.log(mainMenuConcat);

const str = "ThomasJones";
const letters = [...str, "Hello"];
console.log(letters);
console.log(...letters);

// Case example: order food
const pastaIngredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt("Ingredient 2"),
  prompt("ingredient 3?"),
];
console.log(pastaIngredients);
restaurant.orderPasta(...pastaIngredients);

//Objects (aren't iterables)
const newRestaurent = {
  foundedIn: 1997,
  ...restaurant,
  founder: "Thomas Jones",
};
console.log(newRestaurent);

const restaurantCopy = { ...restaurant }; //Making object copy
restaurantCopy.name = "Risorante Roma";
console.log(newRestaurent.name);
console.log(restaurantCopy.name);
