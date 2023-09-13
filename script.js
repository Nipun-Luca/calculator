const numbers = document.querySelectorAll(".number");
let firstNumber = "";
let secondNumber = "";
let isFirstDigit = false;

numbers.forEach(element => {
    element.addEventListener("click", () => {
        if(isFirstDigit) {
            firstNumber += element.textContent;
            console.log(firstNumber)
        } else {
            secondNumber += element.textContent;
            console.log(secondNumber)
        }
    })
});



//Operator
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
let operator;

plus.addEventListener("click", () => {
    operator = "+"
    isFirstDigit = !isFirstDigit;
});
minus.addEventListener("click", () => {operator = "-"});
multiply.addEventListener("click", () => {operator = "x"});
divide.addEventListener("click", () => {operator = "÷"});


const equal = document.getElementById("equal");
equal.addEventListener("click", calculation)


//Calculate
function calculation(){
    let num1 = parseInt(firstNumber);
    let num2 = parseInt(secondNumber);
    switch (operator) {
        case "+":
            return console.log(num1 + num2);
        case "-":
            return num1 - num2;
        case "x":
            return num1 * num2;
        case "÷":
            if(num2 == 0){
                return null;
            } else {
                return num1 / num2;
            }
    }
}