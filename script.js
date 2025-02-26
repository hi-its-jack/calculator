// Variables
let previousOp = ""
let currentOp = ""
let operator = null
let shouldResetDisplay = false

const previousDisplay = document.querySelector("#previousDisplay")
const currentDisplay = document.querySelector("#currentDisplay")
const buttons = document.querySelector(".btns")
const decimalButton = document.querySelector("[data-action='.']")

// Event listeners 
buttons.addEventListener("click", (e) => {
    const button = e.target;
    if (button.hasAttribute("data-value")) {
        handleNumber(button.dataset.value)
    } else {
        handleAction(button.dataset.action)
    }
})

// Handle number 
const handleNumber = (value) => {
    if (shouldResetDisplay) {
        currentOp = value
        shouldResetDisplay = false
    } else {
        currentOp = currentOp === "0" ? value : currentOp + value
    }
    updateDisplay()
}

// Handle actions
const handleAction = (action) => {
    if (action === "clear") {
        resetCalculator()
        return
    }

    if (action === "equals") {
        if (previousOp && operator && currentOp) {
            operate()
        }
        return
    }

    if (action === ".") {
        if (!currentOp) {
            currentOp = "0."
        } else if (!currentOp.includes(".")) {
            currentOp += "."
        }
        updateDisplay()
        return
    }

    if (action === "delete") {
        if (currentOp.length > 1) {
            currentOp = currentOp.slice(0, -1)
        } else {
            currentOp = "0"
        }
        updateDisplay()
        return
    }

    if (!currentOp) return

    if (previousOp && operator && currentOp) {
        operate()
    }

    operator = action
    previousOp = `${currentOp} ${operator}`
    currentOp = ""
    updateDisplay()
};

// calculation
const operate = () => {
    const num1 = parseFloat(previousOp)
    const num2 = parseFloat(currentOp)
    let result

    switch (operator) {
        case "+": result = num1 + num2; break
        case "-": result = num1 - num2; break
        case "*": result = num1 * num2; break
        case "/": result = num2 === 0 ? alert("Error: Division by zero") : num1 / num2; break
        default: return
    }

    previousOp = `${previousOp} ${currentOp}`
    currentOp = parseFloat(result.toFixed(4)).toString()
    operator = null
    shouldResetDisplay = true

    updateDisplay();
};

// Reset calculator
const resetCalculator = () => {
    previousOp = ""
    currentOp = ""
    operator = null
    shouldResetDisplay = false
    updateDisplay()
};

// Update display
const updateDisplay = () => {
    previousDisplay.textContent = previousOp
    currentDisplay.textContent = currentOp || "0"
    decimalButton.disabled = currentOp.includes(".");
};

// keyboard 
document.addEventListener("keydown", (e) => {
    const key = e.key
    if (key >= "0" && key <= "9") {
        handleNumber(key)
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleAction(key)
    } else if (key === "Enter" || key === "=") {
        handleAction("equals")
    } else if (key === "Backspace") {
        handleAction("delete")
    } else if (key === ".") {
        handleAction(".")
    }
});

// start up
updateDisplay()
