import {Component, Input} from '@angular/core';
import {QuestionInRawFormat} from '../../../model/QuestionInRawFormat';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {QuestionService} from '../../../service/question/question.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.scss']
})
export class DeleteQuestionComponent {

  /*======================================*
   * FIELDS
   *======================================*/

  @Input() public question: QuestionInRawFormat;
  @Input() public modalRef: NgbModalRef;

  public deletingEnabled: boolean = false;
  public errorMessage: string;
  public adminToken: string = '';

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(private questionService: QuestionService) { }

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
      this.errorMessage = $localize `:@@errorMissingAdminToken:The Admin Token is missing.`;
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
      .then(response => {
        console.log('Response: ', response);
        alert(response);
        this.modalRef.close(true);
      })
      .catch( (err: HttpErrorResponse) => {
        // show error message
        console.log('Error while deleting the Question: ', err);
        if (err.status != 0) {
          this.errorMessage = err.error as string;
        } else {
          this.errorMessage = $localize `:@@errorBackendNotReachable:The server is not reachable.`;
        }
      });
  }

}
