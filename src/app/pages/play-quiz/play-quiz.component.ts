import {Component, OnInit} from '@angular/core';
import {QuestionInPlayFormat} from '../../model/question';
import {PlayQuizService} from '../../service/play-quiz/play-quiz.service';
import {QuestionService} from '../../service/question/question.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  public question: QuestionInPlayFormat;
  public answerSelected: boolean = false;

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public playQuizService: PlayQuizService,
              private questionService: QuestionService) { }

  ngOnInit(): void {
    this.loadCurrentQuestion();
  }

  /**
   * Loads the current question to be shown in the component.
   * @private
   */
  private loadCurrentQuestion() {
    const currentId = this.playQuizService.currentQuestionId;
    this.questionService.getQuestionInPlayFormat(currentId)
      .subscribe(question => {
        this.question = question;
      });
  }

  /*======================================*
   * HANDLE ANSWER
   *======================================*/

  /**
   * Marks the correct and if necessary the selected wrong answer.
   *
   * @param answerLetter the selected answer letter
   */
  checkAnswer(answerLetter: string) {

    // set flag that an answer is selected for disabling the answer buttons
    this.answerSelected = true;

    // get button elements for correct and clicked button
    const correctButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById(`answerbtn-${this.question.correctAnswer}`);
    const clickedButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById(`answerbtn-${answerLetter}`);

    // change button colors according to answer
    if (answerLetter == this.question.correctAnswer) {
      clickedButton.classList.add('answerbtn-correct');
    } else {
      clickedButton.classList.add('answerbtn-wrong');
      correctButton.classList.add('answerbtn-correct');
    }
  }
}
