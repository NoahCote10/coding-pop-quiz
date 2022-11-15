// establishing variables and selecting HTML elements
const prequizText = document.querySelector("#prequiz-text");
const quizContainer = document.querySelector("#quiz-container")
const questionsText = document.querySelector("#questions-text");
const answersText = document.querySelector("#answers-text");
const answersFeedback = document.querySelector("#answers-feedback")
const postquizText = document.querySelector("#post-quiz")
const button = document.querySelector(".quiz-start");
const timeEl = document.querySelector(".time");

let userScores = JSON.parse(localStorage.getItem("scores"));
let secondsLeft = 90

const quizQuestions = [
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerOne: "1. JavaScript",
        answerTwo: "2. terminal/bash",
        answerThree: "3. for loops",
        answerFour: "4. console.log",
        correctAnswer: '4'
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answerOne: "1. quotes",
        answerTwo: "2. curly brackets",
        answerThree: "3. parentheses",
        answerFour: "4. square brackets",
        correctAnswer: '2'
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answerOne: "1. numbers and strings",
        answerTwo: "2. other arrays",
        answerThree: "3. booleans",
        answerFour: "4. all of the above",
        correctAnswer: '4'
    },
    {
        question: "Commonly used data types DO NOT include:",
        answerOne: "1. strings",
        answerTwo: "2. booleans",
        answerThree: "3. alerts",
        answerFour: "4. numbers",
        correctAnswer: '3'
    },
    {
        question: "String Values must be enclosed within ____ when being assigend to variables.",
        answerOne: "1. commas",
        answerTwo: "2. curly brackets",
        answerThree: "3. quotes",
        answerFour: "4. parentheses",
        correctAnswer: '2'
    },
];

// function that is run when start button is clicked
function handleQuiz() {
    // hides pre-quiz text
    secondsLeft = 90
    $(prequizText).hide();
    $("#view-high-scores").hide();
    $("#quiz-container").show();
    // starts timer
    const timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            secondsLeft = 0
            clearInterval(timerInterval);
           $(quizContainer).hide();
           $("#post-quiz").show();
           timeEl.textContent = secondsLeft;
           $(answersFeedback).text("")
        };
        
    }, 1000);
    // displays first question, establishes function for each following question
    let i = 0
    function changeQuestion() {
        $(questionsText).text(quizQuestions[i].question);
        $("#a1").text(quizQuestions[i].answerOne);
        $("#a2").text(quizQuestions[i].answerTwo);
        $("#a3").text(quizQuestions[i].answerThree);
        $("#a4").text(quizQuestions[i].answerFour);
    }
    changeQuestion();
    // if  correct answer is submitted, returns "correct" feedback, moves to next question
    // if incorrect, reduces time by 15 seconds, says "incorrect,"" and loads next question
    // on last question, hides quiz and shows post-quiz page which lets user submit score
    $(".answers").on("click", function () {
        if (this.dataset.answers === quizQuestions[i].correctAnswer) {
            $(answersFeedback).text("Correct!")
        } else {
            $(answersFeedback).text("Incorrect!")
            secondsLeft = secondsLeft - 15
            $(".time").text(secondsLeft);
        }
        i++
        if (i > quizQuestions.length - 1) {
            i = 0
            clearInterval(timerInterval)
            $(quizContainer).hide();
            $(postquizText).show();
            $(answersFeedback).text("")
        } else {
            changeQuestion();
        }
    })
}

// Creates an object that holds users initials and score, then pushes it to the userScores array
function enterScore(userName) {
    let newScore = {
        "name": userName,
        "score": secondsLeft
    };
    (userScores == null) ? userScores = [] : "";
    userScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(userScores));
}

function listScores() {
    for (let i = 0; i < userScores.length; i++) {
        $('#score-list').append('<li>' + userScores[i].name + ": " + userScores[i].score + "</li>");
    };
};
// UNDER CONSTRUCTION
function enterName() {
    let nameInput = $(".name-input").val();
    if (nameInput === "") {
        $('#name-alert').show();
    } else {
        $('#post-quiz').hide();
        $("#high-scores").show();
        enterScore(nameInput);
        listScores();
    };
};

$('#view-high-scores').on('click', function () {
    $(prequizText).hide();
    $('#post-quiz').hide();
    $("#high-scores").show();
    listScores();
});

$(".back-button").on("click", function(){
    $("#high-scores").hide();
    $(prequizText).show();
});

button.addEventListener("click", function (event) {
    event.preventDefault();
    handleQuiz();
})

$("#submit-name").on("click", enterName);
