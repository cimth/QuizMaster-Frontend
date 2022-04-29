import {Component, Input, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {QuestionService} from '../../../service/question/question.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-select-random-quiz',
  templateUrl: './select-random-quiz.component.html',
  styleUrls: ['./select-random-quiz.component.css']
})
export class SelectRandomQuizComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  @Input() public modalRef: NgbModalRef;

  public totalQuestions: number = 0;
  public questionCount: number = 15;

  public MIN_QUESTION_COUNT: number = 1;
  public MAX_QUESTION_COUNT: number = 30;

  public isLoading: boolean = true;

  public errorMessage: string = undefined;

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    // init total question count and adjust max questions if necessary
    this.questionService.getAllQuestions()
      .then(allQuestions => {
        // total question count
        this.totalQuestions = allQuestions.length;

        // adjust max questions if less than current maximum
        if (this.MAX_QUESTION_COUNT > this.totalQuestions) {
          this.MAX_QUESTION_COUNT = this.totalQuestions;
        }

        // adjust initial question count if less thant current question count
        if (this.questionCount > this.totalQuestions) {
          this.questionCount = Math.floor(this.totalQuestions / 2);
        }

        // mark quizzes as loaded
        // => use timeout to avoid to short (and thus confusing) loading spinner
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);

      })
      .catch( (err: HttpErrorResponse) => {
        // show error message
        console.log('Error while fetching questions: ', err);
        if (err.status != 0) {
          this.errorMessage = err.error as string;
        } else {
          this.errorMessage = $localize `:@@errorBackendNotReachable:The server is not reachable.`;
        }
      })
  }

  /*======================================*
   * ACTION FOR SELECTION
   *======================================*/

  /**
   * Returns the selected question count to the modal's caller.
   */
  playQuiz() {
    this.modalRef.close(this.questionCount);
  }

  /*======================================*
   * CHANGE QUESTION COUNT
   *======================================*/

  /**
   * Decreases the question count if it is not the min value.
   */
  decreaseQuestionCount() {
    if (this.questionCount > this.MIN_QUESTION_COUNT) {
      this.questionCount--;
    }
  }

  /**
   * Increases the question count if it is not the max value.
   */
  increaseQuestionCount() {
    if (this.questionCount < this.MAX_QUESTION_COUNT) {
      this.questionCount++;
    }
  }
}
