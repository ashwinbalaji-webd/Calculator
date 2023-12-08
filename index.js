`use strict`;
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
        (value === "." && !lastValue.toString().split("").includes(".")) ||
        value !== "."
      ) {
        if (operations.includes(lastValue)) {
          inputArr.push(...[lastValue, value]);
        } else {
          lastValue += value;
          inputArr.push(lastValue);
        }
      } else {
        inputArr.push(lastValue);
      }
    }
    // If entered value is an operation
    else if (operations.includes(value)) {
      if (parseFloat(lastValue) && value === "%") {
        inputArr.push((lastValue / 100).toString());
      } else if (operations.includes(lastValue) && value === "%") {
        inputArr.push(lastValue);
      } else if (
        (operations.includes(lastValue) && lastValue !== "%") ||
        lastValue === value
      ) {
        lastValue = value;
        inputArr.push(lastValue);
      } else if (typeof lastValue !== "undefined") {
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
        processInputs();
        // calculate();
      }
    } else {
      throw new Error("Invalid input!");
    }
    display();
  } catch (err) {
    console.log(err);
  }
}

// Loops through all the inputs and calculate output
function processInputs() {
  let tempArr = [...inputArr];
  let total = 0;
  for (let i = 0; i < inputArr.length; i += 3) {
    let num1 = tempArr.shift(i);
    let operator = tempArr.shift(i + 1);
    let num2 = tempArr.shift(i + 2);
    total = calculate(operator, parseFloat(num1), parseFloat(num2));
    tempArr.unshift(total);
  }

  displayOutput(tempArr[0]);
}

// Displays output to the screen
function displayOutput(output) {
  const outputEl = document.getElementById("output");
  outputEl.innerHTML = output;
}

// Calculate entered inputs
function calculate(operator, num1, num2 = 0) {
  switch (operator) {
    case "+":
      total = num1 + num2;
      break;
    case "-":
      total = num1 - num2;
      break;
    case "*":
      total = num1 * num2;
      break;
    case "/":
      total = num1 / num2;
      break;
  }

  return total;
}

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
