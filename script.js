// Calculator screen
const currentScreen = document.getElementById("current-screen");
const lastScreen = document.getElementById("last-screen");

const numbers = document.querySelectorAll(".number");
let firstNumber = "";
let secondNumber = "";
let operator = "";
let isFirstDigit = true;
let isOperatorPressed = false;
let isEqualPressed = false;

numbers.forEach(element => {
    element.addEventListener("click", () => {
        if (isEqualPressed) {
            resetCalculator();
        }

        if (!isFirstDigit) {
            secondNumber += element.textContent;
        } else {
            firstNumber += element.textContent;
        }

        currentScreen.textContent += element.textContent;
    });
});

// Operator
const operators = document.querySelectorAll(".operator");

operators.forEach(op => {
    op.addEventListener("click", () => {
        if (!isOperatorPressed) {
            if (isFirstDigit && secondNumber !== "") {
                // Calculate and display result
                performCalculation();
                // Set the operator for the next operation
                firstNumber = currentScreen.textContent;
                secondNumber = "";
                currentScreen.textContent += " " + op.textContent + " ";
            } else {
                operator = op.textContent;
                currentScreen.textContent += " " + operator + " ";
                isFirstDigit = false;
                isOperatorPressed = true;
                isEqualPressed = false;
            }
        }
    });
});

// Calculate
// Calculate
function performCalculation() {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "÷":
            if (num2 === 0) {
                resetCalculator();
                currentScreen.textContent = "Error";
                return;
            } else {
                result = num1 / num2;
            }
            break;
        default:
            break;
    }

    lastScreen.textContent = firstNumber + " " + operator + " " + secondNumber + " =";
    currentScreen.textContent = result.toString();
    firstNumber = result.toString();
    secondNumber = "";
    isFirstDigit = false;
    isOperatorPressed = false;
}


// Equal and display result
const equal = document.getElementById("equal");

equal.addEventListener("click", () => {
    if (!isEqualPressed && isOperatorPressed && secondNumber !== "") {
        performCalculation();
        isEqualPressed = true;
    }
});

// Clear
const clearButton = document.getElementById("clear");

clearButton.addEventListener("click", () => {
    resetCalculator();
});

function resetCalculator() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    currentScreen.textContent = "";
    lastScreen.textContent = "";
    isFirstDigit = true;
    isOperatorPressed = false;
    isEqualPressed = false;
}


// Delete
const deleteButton = document.getElementById("delete");

deleteButton.addEventListener("click", () => {
    if (!isEqualPressed) {
        currentScreen.textContent = currentScreen.textContent.slice(0, -1);
        const lastChar = currentScreen.textContent.slice(-1);

        if (currentScreen.textContent === "") {
            resetCalculator();
        } else if (isNaN(lastChar) || lastChar === ".") {
            operator = "";
            isFirstDigit = false;
            isOperatorPressed = false;
        }
    }
});

// Percentage
const percentageButton = document.getElementById("percentage");

percentageButton.addEventListener("click", () => {
    if (!isEqualPressed && currentScreen.textContent !== "") {
        const expression = currentScreen.textContent.split(" ");
        if (expression.length === 3) {
            const num1 = parseFloat(expression[0]);
            const num2 = parseFloat(expression[2]);
            const calculatedResult = (num1 * num2) / 100;
            lastScreen.textContent = currentScreen.textContent + " =";
            currentScreen.textContent = calculatedResult.toString();
            isFirstDigit = false;
            isOperatorPressed = false;
            isEqualPressed = true;
        }
    }
});

// Dot
const dotButton = document.getElementById("dot");

dotButton.addEventListener("click", () => {
    if (!isEqualPressed) {
        if (!isFirstDigit) {
            if (secondNumber.indexOf(".") === -1) {
                secondNumber += ".";
                currentScreen.textContent += ".";
            }
        } else {
            if (firstNumber.indexOf(".") === -1) {
                firstNumber += ".";
                currentScreen.textContent += ".";
            }
        }
    }
});