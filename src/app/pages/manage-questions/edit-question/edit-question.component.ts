import {Component, Input, OnInit} from '@angular/core';
import {QuestionInRawFormat} from '../../../model/QuestionInRawFormat';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {QuestionService} from '../../../service/question/question.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  @Input() public originalQuestion: QuestionInRawFormat;
  @Input() public modalRef: NgbModalRef;

  public editedQuestion: QuestionInRawFormat;
  public editableAnswers: boolean = false;
  public savingEnabled: boolean = false;
  public errorMessage: string;
  public adminToken: string = '';

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.editedQuestion = new QuestionInRawFormat(
      this.originalQuestion.id,
      this.originalQuestion.questionText,
      this.originalQuestion.correctAnswer,
      this.originalQuestion.wrongAnswer1,
      this.originalQuestion.wrongAnswer2,
      this.originalQuestion.wrongAnswer3
    );
  }

  /*======================================*
   * VALIDATION FOR COMPONENT
   *======================================*/

  /**
   * Only enable the button for saving the updated question if the necessary fields are filled.
   * Show an error message if there is any field not filled after any input update.
   */
  enableOrDisableSaveButtonAccordingToInput() {
    // only enable saving if all fields are filled
    this.savingEnabled = this.adminToken.trim().length > 0
      && this.editedQuestion.questionText.trim().length > 0
      && this.editedQuestion.correctAnswer.trim().length > 0
      && this.editedQuestion.wrongAnswer1.trim().length > 0
      && this.editedQuestion.wrongAnswer2.trim().length > 0
      && this.editedQuestion.wrongAnswer3.trim().length > 0;

    // show error for empty fields if necessary
    if (!this.savingEnabled) {
      this.errorMessage = $localize `:@@errorEmptyInputFields:The shown input fields must not be empty.`;
    } else {
      this.errorMessage = undefined;
    }
  }

  /*======================================*
   * ACTIONS FOR COMPONENT
   *======================================*/

  /**
   * @param editableAnswers true if answers should be editable, else false
   */
  setEditableAnswers(editableAnswers: boolean): void {
    this.editableAnswers = editableAnswers;

    // reset answers if answers should not be editable
    if (!editableAnswers) {
      this.editedQuestion.correctAnswer = this.originalQuestion.correctAnswer;
      this.editedQuestion.wrongAnswer1 = this.originalQuestion.wrongAnswer1;
      this.editedQuestion.wrongAnswer2 = this.originalQuestion.wrongAnswer2;
      this.editedQuestion.wrongAnswer3 = this.originalQuestion.wrongAnswer3;
    }
  }

  /**
   * Saves the edited question at the backend.
   * If an error occurs, the error message will be displayed in the component.
   */
  saveQuestion(): void {
    // reset error message
    this.errorMessage = undefined;

    console.log('Edit: ', this.editedQuestion);

    // update question
    this.questionService.saveUpdatedQuestion(this.editedQuestion, this.adminToken)
      .then(response => {
        console.log('Response: ', response);
        alert(response);
        this.modalRef.close(this.editedQuestion);
      })
      .catch( (err: HttpErrorResponse) => {
        // show error message
        console.log('Error while saving the Question: ', err);
        if (err.status != 0) {
          this.errorMessage = err.error as string;
        } else {
          this.errorMessage = $localize `:@@errorBackendNotReachable:The server is not reachable.`;
        }
      });
  }
}
