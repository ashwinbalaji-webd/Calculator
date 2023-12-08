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
    // const value = event.target.value;
    const buttonEl = event.target.closest("button");
    let value = "";

    if (buttonEl) {
      value = buttonEl.value;
      console.log("Button value: ", value);
    }

    let lastValue = inputArr.pop();
    console.log(value);
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
        displayOutput("");
      } else if (value === "delete") {
        inputArr.push(lastValue);
        inputArr.splice(-1);
      } else if (value === "minus") {
        if (lastValue.includes("(")) {
          lastValue = lastValue.replace(/[() -]/g, "");
          inputArr.push(lastValue);
        } else if (Number.isInteger(parseInt(lastValue))) {
          inputArr.push(`(${-parseInt(lastValue)})`);
        }
      } else {
        inputArr.push(lastValue);
        processInputs();
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
  if (inputArr.length < 3) {
    displayOutput(inputArr[0]);
    return;
  }
  let tempArr = [...inputArr];
  let total = 0;
  for (let i = 0; i < inputArr.length; i += 3) {
    let num1 = tempArr.shift(i);
    let operator = tempArr.shift(i + 1);
    let num2 = tempArr.shift(i + 2);
    if (num1 && num2) {
      if (!parseFloat(num1)) num1 = num1.replace(/[()]/, "");
      if (!parseFloat(num2)) num2 = num2.replace(/[()]/, "");

      total = calculate(operator, parseFloat(num1), parseFloat(num2));
      tempArr.unshift(total);
      displayOutput(tempArr[0]);
    }
  }

}

// Displays output to the screen
function displayOutput(output) {
  const outputEl = document.getElementById("output");
  if(output){
    output = parseFloat(output);
    outputEl.innerHTML = Number.isInteger(output) ? output : output.toFixed(5);
  }
  else{
    outputEl.innerHTML = '';
  }
}

// Calculate entered inputs
function calculate(operator, num1, num2 = 0) {
  let total;
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

  keyPadEl.addEventListener("click", valueHandler);
}

init();
