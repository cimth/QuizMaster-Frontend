import {Component, Input} from '@angular/core';
import {LocalizationService} from '../../../service/localization/localization.service';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MESSAGE_ID} from 'src/app/constants/localization/message-id';
import {QuizService} from '../../../service/quiz/quiz.service';
import {HttpErrorResponse} from "@angular/common/http";
import {PredefinedQuizWithResolvedQuestions} from "../../../model/PredefinedQuizWithResolvedQuestions";

@Component({
  selector: 'app-delete-predefined-quiz',
  templateUrl: './delete-predefined-quiz.component.html',
  styleUrls: ['./delete-predefined-quiz.component.css']
})
export class DeletePredefinedQuizComponent {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;

  @Input() public quiz: PredefinedQuizWithResolvedQuestions;
  @Input() public modalRef: NgbModalRef;

  public deletingEnabled: boolean = false;
  public errorMessage: string;
  public adminToken: string = '';

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public loc: LocalizationService,
              private quizService: QuizService) { }

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
   * Deletes the predefined quiz from the backend.
   * If an error occurs, the error message will be displayed in the component.
   */
  deleteQuiz(): void {

    // reset error message
    this.errorMessage = undefined;

    console.log('Delete: ', this.quiz);

    // update question
    this.quizService.deletePredefinedQuiz(this.quiz.quizId, this.adminToken)
      .subscribe(response => {
        console.log('Response: ', response);
        alert(response);
        this.modalRef.close(true);
      }, (err: HttpErrorResponse) => {
        // show error message
        console.log('Error while deleting the predefined Quiz: ', err);
        if (err.status != 0) {
          this.errorMessage = err.error as string;
        } else {
          this.errorMessage = this.loc.localize(MESSAGE_ID.ERRORS.BACKEND_NOT_REACHABLE);
        }
      });
  }

}
