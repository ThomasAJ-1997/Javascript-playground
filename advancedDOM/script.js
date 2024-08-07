"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const buttonSmoothScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

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
// SLIDER COMPONENT
const sliderFunctionality = function () {
  const slides = document.querySelectorAll(".slide");

  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotsContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlides = slides.length;

  // slider.style.transform = `scale(0.3) translateX(-1200px)`;
  // slider.style.overflow = `visible`;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const sliderMove = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    sliderMove(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlides - 1;
    } else {
      currentSlide--;
    }

    sliderMove(currentSlide);
    activeDot(currentSlide);
  };

  const init = function () {
    sliderMove(0);
    createDots();
    activeDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      sliderMove(slide);
      activeDot(slide);
    }
  });
};
sliderFunctionality();
///////////////////////////////////////////////////////////////
// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll("img[data-src]");

const loadingImgs = function (entires, observer) {
  const [entry] = entires;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace scr with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadingImgs, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////////////////////////////
// REVEALING ELEMENTS ON SCROLL
const sectionWebPage = document.querySelectorAll("section");
const revealSection = function (entires, observer) {
  const [entry] = entires;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target); // When we no longer need the observer.
};

const sectionRevealObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sectionWebPage.forEach(function (section) {
  sectionRevealObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////////////////////////////////////
// STICKY NAVIGATION

// Intersection Observer API: Sticky Navigation

// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null, // THE VIEWPORT
//   threshold: [0, 0.2], // The callback will trigger when the target element leaves the view or enters the view.
// };

// const observer = new IntersectionObserver(obsCallback, observerOptions);
// observer.observe(section1);

const headerSection = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(headerSection);

// Scroll Event: This should be avoided as it is bad for performance.

// const inititalCoords = section1.getBoundingClientRect();
// console.log(inititalCoords);

// window.addEventListener("scroll", function (e) {
//   console.log(window.scrollY);

//   if (window.scrollY > inititalCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });
///////////////////////////////////////////////////////////////
// LINK HOVER AFFECT
const handleHover = function (e, opacity) {
  console.log(this);
  if (e.target.classList.contains("nav__link")) {
    const clickedLink = e.target;
    const siblingLinks = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = clickedLink.closest(".nav").querySelector("img");

    siblingLinks.forEach((element) => {
      if (element !== clickedLink) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////////////////////////////

// TABBED COMPONENT

tabsContainer.addEventListener("click", function (e) {
  const clickedBtn = e.target.closest(".operations__tab");

  if (!clickedBtn) return; // A guard clause: If nothing is clicked.

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  clickedBtn.classList.add("operations__tab--active");

  // Active content
  document
    .querySelector(`.operations__content--${clickedBtn.dataset.tab}`)
    .classList.add("operations__content--active");
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
// document.documentElement.style.setProperty("--color-primary", "orangered");
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

///////////////////////////////////////////////////////////////////
// DOM Traversing example
const h1Title = document.querySelector("h1");

// going downwards: accessing child elements
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes); // Node List of elements
console.log(h1.children); // HTML collection of elements (only works for direct children)
// h1.firstElementChild.style.color = "white"; // Only first child gets styled.
// h1.lastElementChild.style.color = "orangered";

// Going upwards: accessing parent elements.
console.log(h1.parentNode);
console.log(h1.parentElement);

// Find a parent element not matter who far away it is in the DOM tree.
// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-secondary)";

// We can look at closest as the opposite of querySelector, so both receive a query string as an input, but querySelector finds children no matter how deep in the DOM tree, while the closest method finds parent elements no matter how far in the DOM tree.

// Goging sideways: selecting sibling elements
// We can only access previous and next sibling elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
// Nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// All siblings
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

//////////////////////////////////////////////////////
// Lifesycle DOM Events

// 1. DOM content loaded: This is fired by the document, This is when the HTMl is parsed and downloaded converted to the DOM tree. All scripts must be downloaded and executed beforre the DOM content is loaded.
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML Parsesd and DOM tree built!", e);
});

// When the script tag at the end, we dont need to listen to the DOM content loaded.

// 2. Load Event: Fired by the window, but when the HTML, images and external files (css are parsed)
window.addEventListener("load", function (e) {
  console.log("Page fully loaded.", e);
});

// 3. Before Unload Event: This is created just when the leaver leaves the page.
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log(e);
  // e.returnValue = "";
});
