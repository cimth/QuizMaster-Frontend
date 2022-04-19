import {Component, Input} from '@angular/core';
import {QuestionInRawFormat} from '../../../model/QuestionInRawFormat';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MESSAGE_ID} from 'src/app/constants/localization/message-id';
import {LocalizationService} from '../../../service/localization/localization.service';
import {QuestionService} from '../../../service/question/question.service';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.css']
})
export class DeleteQuestionComponent {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;

  @Input() public question: QuestionInRawFormat;
  @Input() public modalRef: NgbModalRef;

  public deletingEnabled: boolean = false;
  public errorMessage: string;
  public adminToken: string = '';

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public loc: LocalizationService,
              private questionService: QuestionService) { }

  /*======================================*
   * VALIDATION FOR COMPONENT
   *======================================*/

  /**
   * Only enable the button for deleting the question if the Admin Token is given.
   * Show an error message if the Admin Token is still not given after updating the corresponding input element.
   */
  enableOrDisableDeleteButtonAccordingToInput() {
    this.deletingEnabled = this.adminToken.trim().length > 0;

    if (!this.deletingEnabled) {
      this.errorMessage = this.loc.localize(MESSAGE_ID.ERRORS.ADMIN_TOKEN);
    } else {
      this.errorMessage = undefined;
    }
  }

  /*======================================*
   * ACTIONS FOR COMPONENT
   *======================================*/

  /**
   * Deletes the question from the backend.
   * If an error occurs, the error message will be displayed in the component.
   */
  deleteQuestion(): void {

    // reset error message
    this.errorMessage = undefined;

    console.log('Delete: ', this.question);

    // update question
    this.questionService.deleteQuestion(this.question.id, this.adminToken)
      .subscribe(response => {
        console.log('Response: ', response);
        alert(response);
        this.modalRef.close(true);
      }, err => {
        // show error message
        console.log('Error while deleting the Question: ', err);
        if (err.status != 0) {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = this.loc.localize(MESSAGE_ID.ERRORS.BACKEND_NOT_REACHABLE);
        }
      });
  }

}
