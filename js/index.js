import { Quiz } from "./quiz.js";
import { Question } from "./question.js";

export let quiz;

const categoryMenu = document.getElementById("categoryMenu")
const difficultyOptions = document.getElementById("difficultyOptions")
const questionNumber = document.getElementById("questionsNumber")

const startBtn = document.getElementById("startQuiz")

export let questions;

const quizForm = document.getElementById("quizOptions")
export const questionsContainer = document.querySelector(".questions-container")

startBtn.addEventListener("click", async function () {
    const category = categoryMenu.value;
    const difficulty = difficultyOptions.value;
    const numbers = questionNumber.value;
    quiz = new Quiz(category, difficulty, numbers);
    questions = await quiz.getQuestion();
    const question = new Question(0);
    quizForm.classList.replace("d-flex", "d-none");
    question.displayQuestion();
})

