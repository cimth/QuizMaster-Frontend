import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {QuestionInPlayFormat} from '../../model/QuestionInPlayFormat';
import {PlayQuizService} from '../../service/play-quiz/play-quiz.service';
import {QuestionService} from '../../service/question/question.service';
import {LocalizationService} from '../../service/localization/localization.service';
import {MESSAGE_ID} from '../../constants/localization/message-id';
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit, AfterViewChecked {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;

  public question: QuestionInPlayFormat;
  public isAnswerSelected: boolean;
  public isLastQuestion: boolean;

  public answerButtonsRendered: boolean;
  public isLoadingNextQuestion: boolean;

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public loc: LocalizationService,
              public playQuizService: PlayQuizService,
              private questionService: QuestionService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit(): void {
    // if no quiz state is existing, go select-quiz-format page
    if (this.playQuizService.quizState.questionIds === undefined) {
      void this.router.navigateByUrl('/select-quiz-format');
      return;
    }

    // reset rendering variable because on start the answer buttons are not yet rendered
    this.answerButtonsRendered = false;

    // loading started
    this.isLoadingNextQuestion = true;

    // load the current question from local storage if existing or else fetch it from the backend
    this.loadCurrentQuestion();
  }

  /**
   * Is called everytime an the view has been changed after e.g. an *ngFor directive.
   * <br />
   * This is used to restore the selected answer after reloading the page. However, this restore operation can only
   * be done if all answer buttons are already initialized what has to be checked inside this method first before
   * restoring the answer state.
   */
  ngAfterViewChecked() {

    // get answer buttons
    const btnA = document.getElementById('answerbtn-A');
    const btnB = document.getElementById('answerbtn-B');
    const btnC = document.getElementById('answerbtn-C');
    const btnD = document.getElementById('answerbtn-D');

    // restore selected answer if necessary once after all buttons have been initialized
    if (!this.answerButtonsRendered && btnA && btnB && btnC && btnD) {
      // avoid multiple restore operations
      this.answerButtonsRendered = true;

      // restore if necessary
      this.restoreSelectedAnswer();

      // run another detection of change since view is changed when the selected answer is restored
      this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * Loads the current question to be shown in the component.
   * @private
   */
  private loadCurrentQuestion() {

    // check if the question to load is the last question of the played quiz
    this.isLastQuestion =
            this.playQuizService.quizState.currentIndex == (this.playQuizService.quizState.questionIds.length - 1);

    // restore current question if necessary
    const restored = this.restoreCurrentQuestion();

    // load question if not restored
    if (!restored) {
      const currentId = this.playQuizService.currentQuestionId;
      this.questionService.getQuestionInPlayFormat(currentId)
        .subscribe(question => {
          this.question = question;
          this.playQuizService.quizState.currentQuestion = question;
          this.isLoadingNextQuestion = false;
        }, (err: HttpErrorResponse) => {
          // go to backend-not-reachable page when connection fails
          console.log('Error while resolving questions: ', err)
          if (err.status == 0) {
            setTimeout(() => {
              void this.router.navigateByUrl('/backend-not-reachable');
            }, 1500);
          }
        });
    }
  }

  /**
   * Restores the current question from the local storage if it exists.
   * @private
   */
  private restoreCurrentQuestion(): boolean {
    console.log('Restore current question');

    // get current question from quiz state, might be undefined
    const currentQuestion = this.playQuizService.quizState.currentQuestion;

    // restore question if existing
    if (currentQuestion) {
      this.question = currentQuestion;
      this.isLoadingNextQuestion = false;
    }

    // return true if question was restored, else false
    return currentQuestion !== undefined;
  }

  /**
   * Restore the selected answer from the local storage if it exists.
   * @private
   */
  private restoreSelectedAnswer() {
    console.log('Restore selected answer');

    // get selected answer from quiz state, might be undefined
    const selectedAnswer = this.playQuizService.quizState.selectedAnswer;

    // update values and UI according to restored (or not existing) selected answer
    if (!selectedAnswer) {
      // no answer had been selected previously
      this.isAnswerSelected = false;
    } else {
      // normal behavior like when clicking on an answer button
      // => CAREFUL: set flag for 'isRestored' to avoid quiz state changes
      this.checkAnswer(selectedAnswer, true);
    }
  }

  /*======================================*
   * HANDLE ANSWER
   *======================================*/

  /**
   * Marks the correct and if necessary the selected wrong answer.
   * Updates the quiz state if the selected answer is not restored.
   *
   * @param answerLetter the selected answer letter
   * @param isRestored true if the answer is restored from the quiz state,
   *                   false if the answer has just been made by clicking an answer button
   */
  checkAnswer(answerLetter: string, isRestored: boolean) {

    // set flag that an answer is selected for disabling the answer buttons
    this.isAnswerSelected = true;

    // check if answer is correct
    const correctAnswer = answerLetter == this.question.correctAnswer;

    // update quiz state if it is not restored
    if (!isRestored) {
      this.playQuizService.quizState.selectedAnswer = answerLetter;
      this.playQuizService.updateAnswerCount(correctAnswer);
    }

    // get button elements for correct and clicked button
    const correctButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById(`answerbtn-${this.question.correctAnswer}`);
    const clickedButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById(`answerbtn-${answerLetter}`);

    // change button colors according to answer
    if (correctAnswer) {
      clickedButton.classList.add('answerbtn-correct');
    } else {
      clickedButton.classList.add('answerbtn-wrong');
      correctButton.classList.add('answerbtn-correct');
    }
  }

  /**
   * Updates the quiz state, resets the component and loads the next question.
   */
  nextQuestion() {
    // loading started
    this.isLoadingNextQuestion = true;

    // update quiz state
    this.playQuizService.updateForNextQuestion();

    // reset component variables
    this.isAnswerSelected = false;
    this.answerButtonsRendered = false;

    // load new question
    this.loadCurrentQuestion();
  }

  /**
   * Navigates to the 'finish quiz' page.
   */
  finishQuiz() {
    void this.router.navigateByUrl('/finish-quiz')
  }
}
