import {Component, Input, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MESSAGE_ID} from 'src/app/constants/localization/message-id';
import {PredefinedQuizWithResolvedQuestions} from '../../../model/quiz';
import {LocalizationService} from '../../../service/localization/localization.service';
import {QuizService} from '../../../service/quiz/quiz.service';
import {QuestionService} from '../../../service/question/question.service';

@Component({
  selector: 'app-edit-predefined-quiz',
  templateUrl: './edit-predefined-quiz.component.html',
  styleUrls: ['./edit-predefined-quiz.component.css']
})
export class EditPredefinedQuizComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;

  @Input() public originalQuiz: PredefinedQuizWithResolvedQuestions;
  @Input() public modalRef: NgbModalRef;

  public editedQuiz: PredefinedQuizWithResolvedQuestions;
  public savingEnabled: boolean = false;
  public errorMessage: string;
  public removeQuestionError: number;
  public adminToken: string = '';

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public loc: LocalizationService,
              private quizService: QuizService,
              private questionService: QuestionService) { }

  ngOnInit(): void {
    this.editedQuiz = {
      quizId: this.originalQuiz.quizId,
      quizName: this.originalQuiz.quizName,
      questionCount: this.originalQuiz.questionCount,
      resolvedQuestions: this.originalQuiz.resolvedQuestions.slice()   // copy array with slice()
    }
  }

  /*======================================*
   * VALIDATION FOR COMPONENT
   *======================================*/

  /**
   * Only enable the button for saving the updated quiz if the necessary fields are filled.
   * Show an error message if there is any field not filled after any input update.
   */
  enableOrDisableSaveButtonAccordingToInput() {
    // only enable saving if all fields are filled
    this.savingEnabled = this.adminToken.trim().length > 0
                            && this.editedQuiz.quizName.trim().length > 0;

    // show error for empty fields if necessary
    if (!this.savingEnabled) {
      this.errorMessage = this.loc.localize(MESSAGE_ID.ERRORS.NOT_EMPTY_ALL);
    } else {
      this.errorMessage = undefined;
    }
  }

  /*======================================*
   * ACTIONS FOR COMPONENT
   *======================================*/

  /**
   * Saves the edited quiz at the backend.
   * If an error occurs, the error message will be displayed in the component.
   */
  saveQuiz(): void {
    // reset error message
    this.errorMessage = undefined;

    console.log('Edit: ', this.editedQuiz);

    // update question
    this.quizService.saveUpdatedQuiz(this.editedQuiz, this.adminToken)
      .subscribe(response => {
        console.log('Response: ', response);
        alert(response);
        this.modalRef.close(this.editedQuiz);
      }, err => {
        console.log('Error while saving the Question: ', err);
        this.errorMessage = err.error;
      });
  }

  /**
   * Removes the question from the edited quiz array and adjusts the related values.
   *
   * @param qArrIdx the index of the question inside the array 'this.editedQuiz.resolvedQuestions'
   */
  removeQuestion(qArrIdx: number) {
    this.editedQuiz.resolvedQuestions.splice(qArrIdx, 1);
    this.editedQuiz.questionCount--;
  }
}
