//global scope variables
const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")

//declare state variable equal to object with default properties for our game
let state = {
    score: 0,
    wrongAnswers: 0,
}

//refresh game when it is opened, each correct/incorrect answer, and when the game is restarted
function updateProblem(){
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`

    //update input
    ourField.value = ""
    ourField.focus()
}

updateProblem()

//declare function that passes the max number you would like as argument and returns a random number between 0 and that number
function generateNumber(max){
    return Math.floor(Math.random() * (max + 1)) //math.floor rounds down so we need 1 + our max desired value
}


function generateProblem(){
    return{ //return object with two numbers and an operator for our math problem
        numberOne: generateNumber(10), //use generateNumber function where argument is the max number we would like it to return a random number between
        numberTwo: generateNumber(10),
        operator: ['+','-','x'][generateNumber(2)] //utilizes generateNumber to return random value in array
         //Division is excluded to avoid decamils and undefined when number divided by 0
    }
}

//prevent default of browser completely re-rendering page every time we submit
//instead rerender only the defined values we create
ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault()

    let correctAnswer
    const p = state.currentProblem

    //Division is excluded to avoid decamils and undefined when number divided by 0
    if(p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
    if(p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
    if(p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

    if(parseInt(ourField.value, 10) === correctAnswer){
        state.score++
        pointsNeeded.textContent = 10 - state.score
        updateProblem()
    }else{
        state.wrongAnswers++
        mistakesAllowed.textContent = 2 - state.wrongAnswers
        updateProblem()
    }

    checkLogic()
}


//check if user won or lost the gaim
function checkLogic(){
    //if you won
    if(state.score === 10){
        alert("Congrats you won")
        resetGame()
    }

    //ifyou lost
    if (state.wrongAnswers === 3){
        alert("Sorry, you lost")
        resetGame()
    }
}

//reset the game
function resetGame(){
    updateProblem()
    state.score = 0
    state.wrongAnswers = 0
    pointsNeeded.textContent = 10
    mistakesAllowed.textContent = 2
}
