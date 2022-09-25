const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('Question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answers')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  //this line below isn't working  
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  startTimer()
}

function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}
 
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

function startTimer() { 
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) { 
      if (isWin && timerCount > 0) { 
        clearInterval(timer);
        winGame();
      }
    } 
    if (timerCount === 0) { 
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
 
function getWins() { 
  var storedWins = localStorage.getItem("winCount"); 
  if (storedWins === null) {
    winCounter = 0;
  } else { 
    winCounter = storedWins;
  } 
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

document.addEventListener("keydown", function(event) { 
  if (timerCount === 0) {
    return;
  } } )

 

const questions = [
   
  {
    question: 'What does css mean ',
    answers: [
      { text: 'Cascading Style ', correct: false },
      { text: 'Casacding Style Sheets', correct: false },
      { text: 'Cacsading Style Sheets', correct: false },
      { text: 'Cascading Style Sheets', correct: true }
    ]
  },
  {
    question: 'what does js mean ',
    answers: [
      { text: 'javascirpt', correct: false },
      { text: 'Javascript', correct: true },
      { text: 'javascroit', correct: false },
      { text: 'javascritp', correct: false }
    ]
  }, 
  {
    question: 'what does html mean',
    answers: [
      { text: 'Hypertext market language', correct: false },
      { text: 'Hypertext markup language', correct: true },
      { text: 'Hype market language', correct: false },
      { text: 'Hyper markup language', correct: false }
    ]
  },
]
function init() {
  getWins();
  getlosses();
}


 