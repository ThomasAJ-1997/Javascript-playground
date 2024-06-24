"use strict";

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.body.addEventListener("click", function () {
    header.style.color = "blue";
  });
})();

// Explaining the variables with the coding: Closure

// How does the add event listener get access to the header variable? Answer:

// The Closure:
// A closure is like a backpack that a function carries around
// where ever it goes. This backpack has all the variables that
// were present in the environment where the function was available.
// If JavaScript cannor find a variable in the function scope,
// JavaScript will look at the closure (addEventListener: Header)
// in the backpack find the function variable.
// JavaScript remembers the parent function, even when its gone
// from the parent scope.

// JavaScript creates closures automatically, and cannot be manually
// created or accessed by the programmer; it's an internal
// property, and not a tangible object.
