//variables
const historyDisplay = document.querySelector(".history");
const currentDisplay = document.querySelector(".current");
const buttons = document.querySelectorAll(".btn");

//default values
let firstNum = "";
let secondNum = "";
let operator = null;
let shouldResetDisplay = false;

currentDisplay.textContent = "0";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (!action) {
            updateDisplay(value);
        } else if (action === "clear") {
            clear();
        } else if (action === "delete") {
            deleteNumber();
        } else if (action === "decimal") {
            addDecimal();
        } else if (action === "operator") {
            handleOperator(value);
        } else if (action === "calculate") {
            calculate();
        } else if (action === "sign-toggle") {
            toggleSign();
        }
    });
});

function updateDisplay(value) {
    if (shouldResetDisplay) {
        reset();
    }

    if (value === "." && !currentDisplay.textContent.includes(".")) {
        currentDisplay.textContent += value;
    } else if (value !== ".") {
        currentDisplay.textContent = currentDisplay.textContent === "0" ? value : currentDisplay.textContent + value;
    }

    adjustFontSize(currentDisplay);
}

function reset() {
    currentDisplay.textContent = "";
    shouldResetDisplay = false;
    currentDisplay.classList.remove("long-text", "longer-text");
    adjustFontSize(currentDisplay);
}

function clear() {
    currentDisplay.textContent = "0";
    historyDisplay.textContent = "";
    firstNum = "";
    secondNum = "";
    operator = null;
    shouldResetDisplay = false;
    adjustFontSize(currentDisplay);
}

function deleteNumber() {
    if (currentDisplay.textContent.length > 1) {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    } else {
        currentDisplay.textContent = "0";
    }
    adjustFontSize(currentDisplay);
}

function addDecimal() {
    if (shouldResetDisplay) reset();
    if (!currentDisplay.textContent.includes(".")) {
        currentDisplay.textContent += ".";
    }
}

function handleOperator(operation) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    firstNum = currentDisplay.textContent;
    operator = operation;
    historyDisplay.textContent = `${firstNum} ${operator}`;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || shouldResetDisplay || firstNum === "") return;

    secondNum = currentDisplay.textContent;
    const result = operate(operator, firstNum, secondNum);

    if (result === "Error") {
        currentDisplay.textContent = "Can't divide by zero!";
    } else {
        currentDisplay.textContent = roundNumber(result);
    }

    historyDisplay.textContent = `${firstNum} ${operator} ${secondNum} =`;
    operator = null;
    firstNum = currentDisplay.textContent;
    shouldResetDisplay = true; 
    adjustFontSize(currentDisplay);
}

function roundNumber(num) {
    return Math.round(num * 10000) / 10000;  
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === '+') {
        return a + b;
    } else if (operator === '-') {
        return a - b;
    } else if (operator === '*') {
        return a * b;
    } else if (operator === '/') {
        return b === 0 ? "Error" : a / b;
    } else {
        return null;
    }
}

function toggleSign() {
    const currentValue = parseFloat(currentDisplay.textContent);
    if (!isNaN(currentValue)) {
        currentDisplay.textContent = roundNumber(-currentValue);
    }
    adjustFontSize(currentDisplay);
}

function adjustFontSize(element) {
    if (!element) return;
    const textLength = element.textContent.length;
    if (textLength > 15) {
        element.style.fontSize = '1.5em';
    } else if (textLength > 10) {
        element.style.fontSize = '1.75em';
    } else {
        element.style.fontSize = '2em';
    }
}

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        updateDisplay(e.key);
    } else if (e.key === ".") {
        addDecimal();
    } else if (e.key === "=" || e.key === "Enter") {
        calculate();
    } else if (e.key === "Backspace") {
        deleteNumber();
    } else if (e.key === "Escape") {
        clear();
    } else if (["+", "-", "*", "/"].includes(e.key)) {
        handleOperator(e.key);
    } else if (e.key === "±" || e.key === "+/-") {
        toggleSign();
    }
});
