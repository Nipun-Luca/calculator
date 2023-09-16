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
let isDotPressed = false;

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
            isDotPressed = false;
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
    isDotPressed = false;
});


//Delete button
deleteButton.addEventListener("click", () => {
    if (!isEqualPressed) {
        let removed = expression.pop();
        if(expression.length === operatorIndex) {
            operatorIndex = null;
            isOperatorPressed = false;
            isDotPressed = true;
        } else if (removed == ".") {
            isDotPressed = false;
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
        isDotPressed = false;
    }
}


//Percentage Button
percentageButton.addEventListener("click", () => {
    if (!isEqualPressed && expression.length > 0 && expression.length - 1 !== operatorIndex) {
        if (expression.length - 1 < operatorIndex || operatorIndex === null) { //first number, before the operation sign
            const storeNumber = expression.slice(0);
            expression = []; //only first number present at this point so clear all

            const num = parseFloat(storeNumber.join(""));
            const calculatedResult = Number((num / 100).toPrecision(4));

            //Check if it contains a dot
            if (typeof calculatedResult === 'number' && !Number.isNaN(calculatedResult) && calculatedResult % 1 !== 0) {
                isDotPressed = true;
            }
            
            //Display update
            expression = calculatedResult.toString().split("");
            updateScreen();


        } else { //second number, after the operation sign
            const storeNumber = expression.slice(operatorIndex + 1);
            expression.splice(operatorIndex + 1, (expression.length - 1) - operatorIndex);

            const num = parseFloat(storeNumber.join(""))
            const calculatedResult = Number((num / 100).toPrecision(4));

            //Check if it contains a dot
            if (typeof calculatedResult === 'number' && !Number.isNaN(calculatedResult) && calculatedResult % 1 !== 0) {
                isDotPressed = true;
            }

            //Display update
            let tempExpression = calculatedResult.toString().split("");
            expression = expression.concat(tempExpression);
            updateScreen();
        }
    }
});


//Dot button
dotButton.addEventListener("click", () => {
    if (!isEqualPressed) {
        const lastElement = expression[expression.length - 1];
        if (!isDotPressed && !lastElement.includes(" ") && expression.length - 1 !== operatorIndex) {
            expression.push(".");
            isDotPressed = true;
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