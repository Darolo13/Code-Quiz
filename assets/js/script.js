

var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.answer-text'));
var progressText = document.querySelector('#progressText');
var progressBarFull = document.querySelector('#progressBarFull');
var scoreText = document.querySelector('#score');

var currentQuestion = {}
var acceptingAnswers = true
var time = 0
var questionCounter = 0
var availableQuestions = []

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "strings",
        choice2: "booleans",
        choice3: "alerts",
        choice4: "numbers",
        answer: 3,
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        choice1: "quotes",
        choice2: "curly brackets",
        choice3: "parenthesis",
        choice4: "square brackets",
        answer: 3,
    },
    {
        question: "Arrays in JavaScript can be used to store",
        choice1: "numbers and strings",
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4,
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        choice1: "commas",
        choice2: "curly brackets",
        choice3: "quotes",
        choice4: "parenthesis",
        answer: 3,
    },
    {
        question: "A very useful tool used during development and debugging for printing coontent to the debugger is:",
        choice1: "JavaScript",
        choice2: "terminal/bash",
        choice3: "for loops",
        choice4: "console.log",
        answer: 4,
    }
]

var SCORE_POINTS = 10
var SCORE_WRONG =  5
var MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    
    var timeleft = 50;
    var subtract = timeleft - SCORE_WRONG

    var downloadTimer = setInterval(function function1(){
    document.getElementById("score").innerHTML = timeleft;

    timeleft -= 1;
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("score").innerHTML = "Time is up!"
        return window.location.assign('end.html')
    }
    }, 1000);

    
    console.log(score);
     
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', time)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementTime(SCORE_POINTS)
        } else {
            decrementTime(SCORE_WRONG)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})


incrementTime = num => {
    time += num
    scoreText.innerText = time
}

decrementTime = num => {
    time -= num
    scoreText.innerText = time
}

startGame()
