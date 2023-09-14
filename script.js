//Calculator screen
const currentScreen = document.getElementById("current-screen");
const lastScreen = document.getElementById("last-screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const percentageButton = document.getElementById("percentage");
const dotButton = document.getElementById("dot");
const equalButton = document.getElementById("equal");

let expression = [];
let isEqualPressed = false;

function updateScreen() {
    currentScreen.textContent = expression.join(" ");
}

numbers.forEach(element => {
    element.addEventListener("click", () => {
        if (isEqualPressed) {
            expression = [];
            isEqualPressed = false;
        }
        expression.push(element.textContent);
        updateScreen();
    });
});

operators.forEach(op => {
    op.addEventListener("click", () => {
        if (!isEqualPressed) {
            expression.push(op.textContent);
            updateScreen();
        }
    });
});

clearButton.addEventListener("click", () => {
    expression = [];
    updateScreen();
});

deleteButton.addEventListener("click", () => {
    if (!isEqualPressed) {
        expression.pop();
        updateScreen();
    }
});

equalButton.addEventListener("click", () => {
    if (!isEqualPressed && expression.length >= 3) {
        let result = calculate(expression);
        lastScreen.textContent = expression.join(" ") + " =";
        currentScreen.textContent = result;
        expression = [result];
        isEqualPressed = true;
    }
});

percentageButton.addEventListener("click", () => {
    if (!isEqualPressed && expression.length > 0) {
        const lastElement = expression.pop();
        const num = parseFloat(lastElement);
        const calculatedResult = num / 100;
        expression.push(calculatedResult.toString());
        updateScreen();
    }
});

dotButton.addEventListener("click", () => {
    if (!isEqualPressed) {
        const lastElement = expression[expression.length - 1];
        if (!lastElement.includes(".") && !lastElement.includes(" ")) {
            expression[expression.length - 1] += ".";
            updateScreen();
        }
    }
});

function calculate(expressionArray) {
    let result = parseFloat(expressionArray[0]);
    for (let i = 1; i < expressionArray.length; i += 2) {
        const operator = expressionArray[i];
        const num = parseFloat(expressionArray[i + 1]);
        switch (operator) {
            case "+":
                result += num;
                break;
            case "-":
                result -= num;
                break;
            case "x":
                result *= num;
                break;
            case "÷":
                if (num !== 0) {
                    result /= num;
                } else {
                    return "Error";
                }
                break;
            default:
                break;
        }
    }
    return result.toString();
}

//Percentage Button (Updated)
percentageButton.addEventListener("click", () => {
    if (!isEqualPressed && expression.length > 0) {
        const lastElement = expression.pop();
        if (lastElement.includes(" ")) {
            //If the last element is an operator, push it back and add the percentage
            expression.push(lastElement);
        }
        const num = parseFloat(lastElement);
        const calculatedResult = num / 100;
        expression.push(calculatedResult.toString());
        updateScreen();
    }
});

// Keyboard Support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        numbers.forEach((element) => {
            if (element.textContent === key) {
                element.click();
            }
        });
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        operators.forEach((op) => {
            if (op.textContent === key) {
                op.click();
            }
        });
    } else if (key === "." || key === ",") {
        dotButton.click();
    } else if (key === "Enter" || key === "=") {
        equalButton.click();
    } else if (key === "Escape") {
        clearButton.click();
    } else if (key === "Backspace") {
        deleteButton.click();
    }
});