"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////
// DIFFERENT DOM ELEMENTS

// SELECT ELEMENTS
// Selecting entire document
console.log(document.documentElement); // HTML Document
console.log(document.head); // Select Head
console.log(document.body); // Select Body

// QuerySelector: Document
const header = document.querySelector(".header"); // Select the first header selector
const allSections = document.querySelectorAll(".section"); // Select all sections
console.log(allSections);

// ID & Tag
document.getElementById("section--1"); // Dont need selector like QuerySelector
const allButtons = document.getElementsByTagName("button"); // All elements via tag name
console.log(allButtons); // Returns a HTML Collection: if the DOM changes, this updates automatically.

// Class
document.getElementsByClassName("btn"); // don't need a selector and returns HTML collection.

// CREATING AND INSERTING ELEMENTS

// insertAdjacantHTML: allows to insert HTML elements of text in a specific position relative to the given element in the DOM.

const message = document.createElement("div"); // Return a DOM element
// It's not in the website itself, we have to manually insert it.
message.classList.add("cookie-message");
// message.textContent = "We use cookies for our services";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button';

// Insert message into DOM
// header.prepend(message); // adds the element as the first child of the header element.
header.append(message); // adds the element as the last child of the header element.
// A DOM element is unique and can only exist in one place at a single time.

// Insert mulitple copies
// header.append(message.cloneNode(true)) // Child elements will be cloned.

// BEFORE and AFTER: Insert the <> element
// header.before(message);
// header.after(message);

// DELETE ELEMENTS
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
    // Before ES6: remove method
    // message.parentElement.removeChild(message);
  });
///////////////////////////////////////////////////////////////////////////////////

// STYLES, ATTRIBUTES and CLASSES

// STYLES
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
message.style.padding = "1rem";
console.log(message.style.height); // Using style only works for inline styles we set ourselves.
console.log(message.style.backgroundColor);

// We can get the styles with getComputedStyle if we want it.
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";

// CSS custom properties
document.documentElement.style.setProperty("--color-primary", "orangered");
// Change all --color-primary properties in one go.Can be anything from color, width or padding and etc.

// ATTRIBUTES
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);

logo.alt = "Beautiful Minimalist Logo";

console.log(logo.designer); // Not a standard property.
console.log(logo.className);
console.log(logo.getAttribute("designer")); // Console log Designer attribute

// Set attribute
logo.setAttribute("company", "Banklist");

console.log(logo.getAttribute("src"));
console.log(logo.src);

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data Attributes (Has to start with data in HTML)
console.log(logo.dataset.versionNumber);
// We use data attributes to work with the UI and store data in the UI/HTML Code

// CLASSES
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();
