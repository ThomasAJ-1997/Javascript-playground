///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

GOOD LUCK 😀
*/
"use strict";

// MY ATTEMPT
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    this.answers.push(
      prompt(
        "What is your favourite programming language?\n0: JavaScript\n 1: Python\n 2: Rust\n 3: C++\n (write other option)"
      )
    );
  },
  displayResults: function () {
    for (i = this.answers; i <= this.answers; i++) {
      console.log(this.answers[i]);
    }
  },
};

function answerCall() {
  const register = poll.registerNewAnswer();
  console.log(poll.answers);
}

const answerBTN = document
  .querySelector(".poll")
  .addEventListener("click", answerCall);

///////////////////////////////////////////////////////////////////
// SOLUTION

const poll2 = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // GET ANSWER
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option here)`
      )
    );
    console.log(answer);
    // REGISTER ANSWER
    typeof answer === "number" &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults("string");
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

poll2.registerNewAnswer();

document
  .querySelector(".poll")
  .addEventListener("click", poll2.registerNewAnswer.bind(poll2));

poll2.displayResults.call({ answers: [5, 2, 3] }, "string");
poll2.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");

// const arr1 = [5, 2, 3];
// const arr2 = [1, 5, 3, 9, 6, 1];
