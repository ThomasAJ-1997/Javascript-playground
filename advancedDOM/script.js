"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const buttonSmoothScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

///////////////////////////////////////
// Modal window
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

// SMOOTH SCROLLING

buttonSmoothScroll.addEventListener("click", function (e) {
  const section1coords = section1.getBoundingClientRect();
  // BoundingClientRect is relative to the current view port.
  // console.log(section1coords);

  // console.log(e.target.getBoundingClientRect());
  // console.log("Current scroll position (X/Y)", window.scrollX, window.scrollY);

  // console.log(
  //   "Height and width of vp:",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // ); //

  // window.scrollTo(
  //   // ScrollTo is a global element on window.
  //   // This is how you calculate the absolute current position of the entire document.
  //   // Current position + the current scroll
  //   section1coords.left + window.scrollX,
  //   section1coords.top + window.scrollY
  // );

  // Old school way using scrollTo for smooth scrolling
  //   window.scrollTo({
  //     left: section1coords.left + window.scrollX, top: section1coords.window.scrollY,
  //     behavior: 'smooth',
  // });

  // Modern way: Works on new browsers.
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////////////////////////////
// EVENT DELEGATION: NAV IMPLEMENTATION

// Without: delegation
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();

//     const elementID = this.getAttribute("href");
//     console.log(elementID);
//     document.querySelector(elementID).scrollIntoView({ behavior: "smooth" });
// Code like this for three elements is fine, but if for example the
// forEach had hundreds of elements connected to it, this wouldn't be efficient code.
// We would then use event delegation.
//   });
// });

// With delegation

// Step 01: Add eventListener to a common parent element of all the elements we are interested in.

// Step 02: Determine what element originated the event.

document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log(e.target); // Where the event happened; Stored in e.target
  e.preventDefault();

  //  Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    const elementID = e.target.getAttribute("href");
    document.querySelector(elementID).scrollIntoView({ behavior: "smooth" });
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

///////////////////////////////////////////////////////////////////////////////////

// EVENTS
// It is a signal that is generated by a certain DOM node, which could be a click, hover, keydown and so on. We can then listen for the events and handle them.

// Mouse enter event: Fires when the mouse enters a certain event.
const h1 = document.querySelector("h1");
// This version is better, as addeventlistener can listen to mulitple events.
const alertH1 = function (e) {
  alert("addEventListener: Secret message");

  // h1.removeEventListener("mouseenter", alertH1);
  // The pop up only happens once.
};

// SetTimout of removing the event listener after a duration of time.
h1.addEventListener("mouseenter", alertH1);
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// on event property: old method to listen for events.
// h1.onmouseenter = function (e) {
//   alert("onmouseenter: Great, you are reading the onmouse enter heading");
// };

///////////////////////////////////////////////////////////////////////////////////

// Event Propagation: Examples to understanding Capturing and Bubbbling Phase.

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);

//   // Stop the event Propagation
//   e.stopPropagation();
//   // The parent elements won't be triggered by the click event as propagation is stopped.
//   // What this means is the event never arrived to the parent elements and weren't handled.
//   // However, it isn't a good idea to stop propagation, but could prove to fix something
//   // in complex applications with many handlers for the same event.

//   // addEventListener is only listening for events in the bubbling phase, not the capturing phase, as it isn't really helpful. Bubbling opens up the developer to utilise event delegation. But if you really want to catch events during the capturing phase, we can define a third parameter in the addEventListener function,
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
// });

// document.querySelector(".nav").addEventListener(
//   "click",
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log("NAV", e.target, e.currentTarget);
//     // The target is the same, the currentTarget is the same as the THIS keyword.
//     console.log(e.currentTarget === this);
//   },
//   false
//   // The event listener will no longer catch events from the bubbling phase, but the capturing phase. However, capturing is rarely used today.
// );

// // The code above is an example of event bubbling, the even orginates in the link and
// // bubbles up to its parent element and travel up in the DOM tree.

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
