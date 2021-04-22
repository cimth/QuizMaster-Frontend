import {Component, Input} from '@angular/core';
import {LocalizationService} from '../../../service/localization/localization.service';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PlayQuizService} from '../../../service/play-quiz/play-quiz.service';
import {MESSAGE_ID} from 'src/app/constants/localization/message-id';

@Component({
  selector: 'app-select-random-quiz',
  templateUrl: './select-random-quiz.component.html',
  styleUrls: ['./select-random-quiz.component.css']
})
export class SelectRandomQuizComponent {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;

  @Input() public modalRef: NgbModalRef;

  public questionCount: number = 10;
  private MIN_QUESTION_COUNT = 1;
  private MAX_QUESTION_COUNT = 30;

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public loc: LocalizationService,
              private playQuizService: PlayQuizService) { }

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
