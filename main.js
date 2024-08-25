let firstNum = ""
let secondNum = ""
let operator = null

const display = document.querySelector(".display")
const buttons = document.querySelectorAll(".btn")

display.textContent = "0"

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        const action = button.dataset.action  
        const value = button.dataset.value 

        if (!action){
            updateDisplay(value)
        }
        else if (action === "clear"){
            clear()
        }
        else if (action === "delete"){
            deleteNumber()
        }
        else if (action === "decimal"){
            addDecimal()
        }
        else if (action === "operator"){
            handleOperator(value)
        }
        else if (action === "calculate"){
            //calculate result of operation
        }        

    })
})

function updateDisplay(value){
    if (display.textContent === "0"){
        reset()
    }    
    display.textContent += value
}

function reset(){
    display.textContent = ""
}

function clear(){
    display.textContent = "0"
    firstNum = ""
    secondNum = ""
    operator = null
}

function deleteNumber(){
    display.textContent = display.textContent.slice(0,-1)
    if (display.textContent === ""){
        display.textContent = "0"
    }
}

function addDecimal(){
    if (!display.textContent.includes(".")){
        display.textContent += "."
    }
}

function handleOperator(operation){
    display.textContent += operation.toString()
}








function add(a,b){
    console.log(a+b) 
}
function subtract(a,b){
    console.log(a-b) 
}
function multiply(a,b){
    console.log(a*b) 
}
function divide(a,b){
    console.log(a/b) 
}


/* 
Gotchas...
- Your calculator should not evaluate more than a single pair
of numbers at a time.
- You should round answers with long decimals so that they 
don’t overflow the screen.
- Pressing = before entering all of the numbers or an operator
could cause problems!
- Pressing “clear” should wipe out any existing data. Make sure 
the user is really starting fresh after pressing “clear”
- Display a snarky error message if the user tries to divide by 0… 
and don’t let it crash your calculator!

Extra credit...
Users can get floating point numbers if they do the math 
required to get one, but they can’t type them in yet. Add a . button
and let users input decimals! Make sure you don’t let them type more 
than one though: 12.3.56.5. It is hard to do math on these numbers. 
(disable the decimal button if there’s already one in the display)
- Make it look nice! This is a great project to practice your CSS 
skills. At least make the operations a different color from the keypad
buttons.
- Add a “backspace” button, so the user can undo if they click the 
wrong number.
- Add keyboard support!
*/