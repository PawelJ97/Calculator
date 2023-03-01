// Description: This is the main script file for the calculator app

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const allClear = document.querySelector(".all-clear");
const undo = document.querySelector(".undo");
const previousResult = document.querySelector(".previous-operation");
const currentResult = document.querySelector(".current-operation");

let currentOperation = "";
let previousOperation = "";
let operation = "";

// Function to calculate the result
const calculate = () => {
    let action
    //if there is no prev or current operation, return
    if (!currentOperation || !previousOperation) return;

    // convert the prev and current operation to a number
    const prev = parseFloat(previousOperation);
    const current = parseFloat(currentOperation);

    // if the prev or current operation is not a number, return
    if (isNaN(prev) || isNaN(current)) return;

    // switch statement to calculate 
    switch (operation) {
        case "+":
            action = prev + current;
            break;
        case "−":
            action = prev - current;
            break;
        case "×":
            action = prev * current;
            break;
        case "÷":
            if (current === 0) {
                clearAll();
                return alert("You can't divide by zero");
            }
            action = prev / current;
            break;
        case "√":
            action = Math.pow(prev, 1 / current);
            break;
        case "^":
            action = Math.pow(prev, current);
            break;
        case "%":
            action = prev / 100 * current;
            break;
        case "log":
            action = Math.log(prev) / Math.log(current);
            break;
        default:
            return;
    }
    
    currentOperation = action;
    operation = "";
    previousOperation = "";
};

// Function to update result 
const updateResult = () => {
    previousResult.innerHTML = previousOperation;
    // if operation is not null show operation in the previous result
    if (operation !== null) {
        previousResult.innerText = previousOperation + operation;
    } else {
        previousResult.innerText = "";
    }
    currentResult.innerHTML = currentOperation;
};

// Function to add number to the current operation
const addNumber = (number) => {
    // if the number is a dot, replace it with a period
    //and restrict the user from adding more than one dot
    if (number === "⋅") {
        if (currentOperation.includes(".")) {
            return;
        }
        number = ".";
    }
    currentOperation = currentOperation.toString() + number.toString();
};

// get the number from the DOM and add it to the current operation
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        addNumber(number.innerText);
        updateResult();
    });
});

// Function to add the operator to the current operation
const addOperator = (operator) => {
    if (currentOperation === "") return;
// if the previous operation is not empty, calculate the result
    
    if (previousOperation !== "") {
        const prev = previousResult.innerText;
        if (currentOperation.toString() === "0" && prev[prev.length - 1] === "÷") {
            clearAll();
            return alert("You can't divide by zero");
        }
        calculate();
    }

    operation = operator;
    previousOperation = currentOperation;
    currentOperation = "";
};

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        addOperator(operator.innerText);
        updateResult();
    });
});

// Event listener for the equal button
equal.addEventListener("click", () => {
    calculate();
    updateResult();
});

// delete the last number from the current operation
const undoNumber = () => {
    currentOperation = currentOperation.toString().slice(0, -1);
};

// event listener for the undo button
undo.addEventListener("click", () => {
    undoNumber();
    updateResult();
});

// clear all 
const clearAll = () => {
    currentOperation = "";
    previousOperation = "";
    operation = "";
};

// event listener for the clear button
allClear.addEventListener("click", () => {
    clearAll();
    updateResult();
});

