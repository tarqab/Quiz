import { questions, quiz, questionsContainer } from './index.js';



export class Question {
  constructor(index) {
    this.question = questions[index].question
    this.category = questions[index].category
    this.answer = questions[index].correct_answer
    this.index = index
    this.wrongAnswers = questions[index].incorrect_answers
    this.allAnswers = this.getallAnswers()
    this.answered = false
  }
  getallAnswers() {
    return this.wrongAnswers.concat(this.answer).sort()
  }

  displayQuestion() {
    const questionsHTML = `
        <div
          class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
        >
          <div class="w-100 d-flex justify-content-between">
            <span class="btn btn-category">${this.category}</span>
            <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length
      } Questions</span>
          </div>
          <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
          <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
          ${this.allAnswers.map((choice) => `<li>${choice}</li>`).join("")}
          </ul>
          <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quiz.score
      } </h2>        
        </div>
      `;
    questionsContainer.innerHTML = questionsHTML
    const allAnswers = document.querySelectorAll(".question ul li")
    for (let i = 0; i < allAnswers.length; i++) {
      allAnswers[i].addEventListener("click", (e) => this.checkAnswer(e))
    }
  }

  checkAnswer(e) {
    if (!this.answered) {
      this.answered = true;
      if (e.target.innerHTML.toLowerCase() === this.answer.toLowerCase()) {
        e.target.classList.add("correct", "animate__animated", "animate__heartBeat")
        quiz.score += 1;
      }
      else {
        e.target.classList.add("wrong", "animate__animated", "animate__fadeInRightBig")
      }
    }
    this.animateQuestion(e.target, 1000)
  }

  animateQuestion(element, duration) {
    setTimeout(() => {
      element.closest(".question").classList.replace("animate__bounceIn", "animate__backOutLeft")
      setTimeout(() => {
        this.nextQuestion()
      }, 500)
    }, duration)
  }
  nextQuestion() {
    if (this.index <= questions.length - 2) {
      this.index += 1;
      const x = new Question(this.index)
      x.displayQuestion();
    }
    else {
      questionsContainer.innerHTML = quiz.showResult()
      const tryAgainBtn = document.querySelector(".again");
      tryAgainBtn.addEventListener("click", function () {
        window.location.reload();
      })
    }
  }

}

