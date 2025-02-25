//Variables (define stuff)
let previousOp = ''
let currentOp = ''
let operator = null

//Event listeners (make buttons works)
const display = document.querySelector(".display")
const buttons = document.querySelector(".btns")

//Update display (show logic in display)
buttons.addEventListener("click", (e) => {
    const button = e.target 
    button.hasAttribute("data-value") ?
        handleNumber(button.dataset.value) :
        handleAction(button.dataset.action)     
})

const updateDisplay = () => {
    display.textContent = currentOp || previousOp || 0
}

const resetDisplay = () => {
    previousOp = ''
    currentOp = ''
    operator = null
    updateDisplay()
}

//Handle operations (make logic work)
const handleNumber = (value) => {
    currentOp += value
    updateDisplay()
}
const handleAction = (action) => {
    if (action == 'clear') {
        resetDisplay()
        return
    } 
    if (action == 'equals') {
        if (currentOp && previousOp) {
            operate()
        }
        return
    } 
    if (!currentOp) return
    
    if (previousOp && operator && currentOp) {
        operate()
    }
        operator = action
        previousOp = currentOp
        currentOp = ''


    updateDisplay()
    }


const operate = () => {
    
    op1 = parseFloat(previousOp)
    op2 = parseFloat(currentOp)
    let result

    switch (operator) {
        case "+": result = op1 + op2 ; break
        case "-": result = op1 - op2 ; break
        case "*": result = op1 * op2 ; break
        case "/": result = op2 == 0 ? "Don't divide by zero, you donut!" : op1 / op2 ; break
    }

    currentOp = result.toString()
    previousOp = ''
    operator = null

    updateDisplay()
}

//Edge cases (handle one off things that could break it)