// establishing variables and selecting HTML elements
const prequizText = document.querySelector("#prequiz-text");
const quizContainer = document.querySelector("#quiz-container")
const questionsText = document.querySelector("#questions-text");
const answersText = document.querySelector("#answers-text");
const answersFeedback = document.querySelector("#answers-feedback")
const postquizText = document.querySelector("#post-quiz")
const button = document.querySelector("button");
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
    $(prequizText).hide();
    // starts timer
    const timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            // call score page and enter initials
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
            console.log("your code worked yaaaay");
        } else {
            $(answersFeedback).text("Incorrect!")
            secondsLeft = secondsLeft - 15
            $(".time").text(secondsLeft);
            console.log("incorrect, try again");
        }
        i++
        if (i > quizQuestions.length - 1) {
            clearInterval(timerInterval)
            console.log('quiz complete');
            $(quizContainer).hide();
            $(postquizText).show();

        } else {
            changeQuestion();
        }
    })
}


button.addEventListener("click", function (event) {
    event.preventDefault();
    handleQuiz();
})