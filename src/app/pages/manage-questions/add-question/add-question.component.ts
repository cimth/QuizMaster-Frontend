import {Component, Input, OnInit} from '@angular/core';
import {QuestionInRawFormat} from '../../../model/QuestionInRawFormat';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';import {QuestionService} from '../../../service/question/question.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  @Input() public modalRef: NgbModalRef;

  public newQuestion: QuestionInRawFormat;
  public addingEnabled: boolean = false;
  public errorMessage: string;
  public adminToken: string = '';

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.newQuestion = new QuestionInRawFormat(undefined, '', '', '', '', '');
  }

  /*======================================*
   * VALIDATION FOR COMPONENT
   *======================================*/

  /**
   * Only enable the button for adding the question if the necessary fields are filled.
   * Show an error message if there is any field not filled after any input update.
   */
  enableOrDisableAddButtonAccordingToInput() {
    // only enable saving if all fields are filled
    this.addingEnabled = this.adminToken.trim().length > 0
                          && this.newQuestion.questionText.trim().length > 0
                          && this.newQuestion.correctAnswer.trim().length > 0
                          && this.newQuestion.wrongAnswer1.trim().length > 0
                          && this.newQuestion.wrongAnswer2.trim().length > 0
                          && this.newQuestion.wrongAnswer3.trim().length > 0;

    // show error for empty fields if necessary
    if (!this.addingEnabled) {
      this.errorMessage = $localize `:@@errorEmptyInputFields:The shown input fields must not be empty.`;
    } else {
      this.errorMessage = undefined;
    }
  }

  /*======================================*
   * ACTIONS FOR COMPONENT
   *======================================*/

  /**
   * Adds the question to the backend.
   * If an error occurs, the error message will be displayed in the component.
   */
  addQuestion(): void {

    // reset error message
    this.errorMessage = undefined;

    console.log('Add: ', this.newQuestion);

    // add question
    this.questionService.addQuestion(this.newQuestion, this.adminToken)
      .then(createdQuestion => {
        // add id of new question to new question object
        console.log('Response: ', createdQuestion);
        this.newQuestion.id = createdQuestion.id;

        // show success message
        const dialogMessage = $localize `:@@successQuestionCreated:The Question was successfully created!`;
        alert(dialogMessage);

        // close modal and return new question with added id
        this.modalRef.close(this.newQuestion);

      })
      .catch ( (err: HttpErrorResponse) => {
        // show error message
        console.log('Error while adding the Question: ', err);
        if (err.status != 0) {
          this.errorMessage = err.error as string;
        } else {
          this.errorMessage = $localize `:@@errorBackendNotReachable:The server is not reachable.`;
        }
      });
  }

}
