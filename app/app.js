import "./styles/main.scss"
import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import ProgressBar from "./components/ProgressBar"


function App(){
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [currentProblem, setCurrentProblem] = useState(generateProblem())
  const [userAnswer, setUserAnswer] = useState('')
  const [showError, setShowError] = useState(false)
  const answerField = useRef(null)
  const resetButton = useRef(null)
  
  useEffect(()=>{
    if(score == 10 || mistakes ==3){
      setTimeout(() => resetButton.current.focus(),331)
    }
  }, [score, mistakes])
  
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
  
  function handleSubmit(e){
    e.preventDefault()
    
    answerField.current.focus()
    
    let correctAnswer
    if(currentProblem.operator == "+") correctAnswer = currentProblem.numberOne + currentProblem.numberTwo
    if(currentProblem.operator == "-") correctAnswer = currentProblem.numberOne - currentProblem.numberTwo
    if(currentProblem.operator == "x") correctAnswer = currentProblem.numberOne * currentProblem.numberTwo
    
    if(correctAnswer == parseInt(userAnswer, 10)){
      setScore(prev => prev + 1)
      setCurrentProblem(generateProblem())
      setUserAnswer('')
    } else{
      setMistakes(prev => prev + 1)
      setShowError(true)
      setTimeOut(() => setShowError(false),401)
    }
    
  }
  
  function resetGame(){
    setScore(0)
    setMistakes(0)
    setUserAnswer('')
    setCurrentProblem(generateProblem())
    answerField.current.focus()
  }

  
  
  return (
    <>
      <div className="main-ui">
        <div className="problem-wrapper">
          <p className={"problem" + (showError? " animate-wrong": "")}>{currentProblem.numberOne} {currentProblem.operator} {currentProblem.numberTwo}</p>
          <form onSubmit={handleSubmit} action="" className="our-form">
            <input ref={answerField} value={userAnswer} onChange={e => setUserAnswer(e.target.value)} type="text" className="our-field" autoComplete="off" />
            <button>Submit</button>
          </form>
          <p>You need {10 - score} more points to win and are allowed to make {2 - mistakes} more mistakes.</p>
        </div> 
        <ProgressBar score={score}/>
      </div>

      <div className={"overlay" + (mistakes == 3 || score == 10? " overlay--visible": "")}>
        <div className="overlay-inner">
          <p className="end-message">{score == 10 ? "Congrats, you won!" : "Sorry, you lost..." }</p>
          <button ref={resetButton} onClick={resetGame} className="reset-button">Start Over</button>
        </div>
      </div>
      
    </>
  )
}



ReactDOM.render(<App />, document.getElementById("app"))


if(module.hot){
    module.hot.accept()
}