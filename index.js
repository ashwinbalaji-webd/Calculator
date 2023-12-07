`use strict`;

let total = 0;
let tempNum = "";
let inputDisplay = "";
let inputArr = [];
const notNums = [
  "+",
  "-",
  "/",
  "*",
  "%",
  "clear",
  "delete",
  "minus",
  "calculate",
];
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operations = ["+", "-", "/", "*", "%"];
const functionalities = ["clear", "delete", "minus", "calculate"];

// Handle entered value
function valueHandler(event) {
  try {
    const value = event.target.value;
    let lastValue = inputArr.pop();

    // If entered value is number
    if (nums.includes(value)) {
      if (typeof lastValue === "undefined" && lastValue !== ".") {
        lastValue = value;
        inputArr.push(lastValue);
      } else if (
        (value === "." && !lastValue.split("").includes(".")) ||
        value !== "."
      ) {
        if (operations.includes(lastValue)) {
          inputArr.push(...[lastValue, value]);
        } else {
          lastValue += value;
          inputArr.push(lastValue);
        }
      }
    }
    // If entered value is an operation
    else if (operations.includes(value)) {
      if (operations.includes(lastValue)) {
        lastValue = value;
        inputArr.push(lastValue);
      } else {
        inputArr.push(...[lastValue, value]);
      }
    }
    // If entered value is a functionality
    else if (functionalities.includes(value)) {
      if (value === "clear") {
        inputArr = [];
      } else if (value === "delete") {
        inputArr.push(lastValue);
        inputArr.splice(-1);
      } else if (value === "minus" && Number.isInteger(parseInt(lastValue))) {
        inputArr.push(`(${-parseInt(lastValue)})`);
      } else {
        inputArr.push(lastValue);
        calculate();
      }
    } else {
      throw new Error("Invalid input!");
    }
    display();
  } catch (err) {
    console.log(err);
  }
}

function calculate() {}

// Display entered values in the input field
function display() {
  const inputEl = document.getElementById("input");
  console.log(inputArr);
  inputEl.value = inputArr.join("");
}

// Initial function
function init() {
  const keyPadEl = document.getElementById("keypad-container");

  const buttonEls = keyPadEl.querySelectorAll("button");

  buttonEls.forEach((buttonEL) => {
    buttonEL.addEventListener("click", valueHandler);
  });
}

init();
