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
let operatorIndex = null;
let isEqualPressed = false;
let isOperatorPressed = false;

//Display
function updateScreen() {
    let screenContent = "";
    if (!(operatorIndex === null)) {
        //Add spaces around the operator
        expression.forEach((element, index) => {
            if (index === operatorIndex) {
                screenContent += " " + element + " ";
            } else {
                screenContent += element;
            }
        });
    } else {
        //No operator, just join with spaces
        screenContent = expression.join('');
    }

    currentScreen.textContent = screenContent;
}


//Numbers button
numbers.forEach(element => {
    element.addEventListener("click", () => {
        if (isEqualPressed) {
            isEqualPressed = false;
        }
        expression.push(element.textContent);
        updateScreen();
    });
});


//Operators button
operators.forEach(op => {
    op.addEventListener("click", () => {
        if (!isEqualPressed && !isOperatorPressed && expression.length !== 0) {
            expression.push(op.textContent);
            operatorIndex = expression.length - 1;
            isOperatorPressed = true;
            updateScreen();
        } else if (expression.length - 1 > operatorIndex) {
            equal();  //Carry out calculation of current expression if user clicks an operator button again
            expression.push(op.textContent);
            operatorIndex = expression.length - 1;
            isOperatorPressed = true;
            updateScreen();
        }
    });
});


//Clear button
clearButton.addEventListener("click", () => {
    expression = [];
    currentScreen.textContent = "";
    lastScreen.textContent = "";
    operatorIndex = null;
    isOperatorPressed = false;
});


//Delete button
deleteButton.addEventListener("click", () => {
    if (!isEqualPressed) {
        expression.pop();
        if(expression.length === operatorIndex) {
            operatorIndex = null;
            isOperatorPressed = false;
        }
        updateScreen();
    }
});


//Equal button
equalButton.addEventListener("click", equal);

function equal() {
    if (!isEqualPressed && expression.length >= 3 && operatorIndex !== null && expression.length - 1 > operatorIndex ) {
        let result = calculate(expression);
        lastScreen.textContent = currentScreen.textContent + " =";
        currentScreen.textContent = result;

        if(!(result == "Error")) {
            expression = result.split('');
            operatorIndex = null;
            isOperatorPressed = false;
        } else {
            expression = [];
        }
        operatorIndex = null;
        isOperatorPressed = false;
    }
}


//Percentage Button
percentageButton.addEventListener("click", () => {
    if (!isEqualPressed && expression.length > 0 && expression.length - 1 !== operatorIndex) {
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


//Dot button
dotButton.addEventListener("click", () => {
    if (!isEqualPressed) {
        const lastElement = expression[expression.length - 1];
        if (!lastElement.includes(".") && !lastElement.includes(" ")) {
            expression[expression.length - 1] += ".";
            updateScreen();
        }
    }
});


//Calculation
function calculate(expressionArray) {
    let result = 0;
    const operator = expressionArray[operatorIndex];
    const firstNumber = parseFloat(expressionArray.slice(0, operatorIndex).join(''));
    const secondNumber = parseFloat(expressionArray.slice(operatorIndex + 1).join(''));
    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "x":
            result = firstNumber * secondNumber;
            break;
        case "÷":
            if (secondNumber !== 0) {
                result = firstNumber / secondNumber;
            } else {
                return "Error";
            }
            break;
        default:
            break;
    }

    return result.toString();
}


//Keyboard Support
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