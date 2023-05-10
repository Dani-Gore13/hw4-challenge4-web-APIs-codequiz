const questions = [
  {
    question: "What is JavaScript?",
    answers: [
      {
        text: " JavaScript is a programming language used to make web pages interactive.",
        correct: true,
      },
      { text: "Fancy HTML", correct: false },
      { text: "An old way of coding", correct: false },
    ],
  },
  {
    question: "How do you declare a variable in JavaScript?",
    answers: [
      { text: "const myVariable;", correct: false },
      { text: "All of these are correct", correct: true },
      { text: "var myVariable;", correct: false },
    ],
  },
  {
    question: "What does the DOM stand for in JavaScript?",
    answers: [
      { text: "Document Oriented Model", correct: false },
      { text: "Document Object Model ", correct: true },
      { text: "Document Overflow Model", correct: false },
    ],
  },
  {
    question: "What is an array in JavaScript?",
    answers: [
      { text: " A collection of strings.", correct: false },
      { text: "A collection of numbers.", correct: false },
      { text: " A collection of any data type", correct: true },
    ],
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: [
      { text: "undefined", correct: true },
      { text: "string", correct: false },
      { text: "boolean", correct: false },
    ],
  },
  {
    question: "What is the correct way to write an if statement in JavaScript?",
    answers: [
      { text: "if (i = 5)", correct: false },
      { text: "if (i == 5)", correct: true },
      { text: "if i == 5", correct: false },
    ],
  },
];

const startButton = document.getElementById("start");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const initialsInput = document.getElementById("initials-input");
const saveButton = document.getElementById("save-button");
const gameOverContainer = document.getElementById("game-over-container");
const finalScoreElement = document.getElementById("final-score");

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let score = 0;

startButton.addEventListener("click", startQuiz);
answerButtons.addEventListener("click", selectAnswer);
saveButton.addEventListener("click", saveScore);

function startQuiz() {
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");

  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);

  // Display the first question
  showQuestion();
}

function showQuestion() {
  resetQuestionState();

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.innerText = currentQuestion.question;

  // Create answer buttons for each answer option
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = true;
    }
    answerButtons.appendChild(button);
  });
}

function resetQuestionState() {
  // Clear previous answers
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct;

  if (correct) {
    score += 10; // Increase score for correct answer
  } else {
    timeLeft -= 10; // Decrease time for incorrect answer
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }

  // Highlight selected answer
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  // Delay next question or end game
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function updateTimer() {
  timeLeft--;
  timerElement.innerText = timeLeft;
  if (timeLeft <= 0) {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.classList.add("hide");
  gameOverContainer.classList.remove("hide");
  finalScoreElement.innerText = score;
}

function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    console.log("Initials:", initials);
    console.log("Score:", score);
    // This saves as a console log but that's okay
  }
}
