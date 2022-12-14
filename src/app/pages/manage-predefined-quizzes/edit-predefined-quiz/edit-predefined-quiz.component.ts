import {Component, Input, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PredefinedQuizWithResolvedQuestions} from '../../../model/PredefinedQuizWithResolvedQuestions';
import {QuizService} from '../../../service/quiz/quiz.service';
import {QuestionService} from '../../../service/question/question.service';
import {QuestionInRawFormat} from '../../../model/QuestionInRawFormat';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-predefined-quiz',
  templateUrl: './edit-predefined-quiz.component.html',
  styleUrls: ['./edit-predefined-quiz.component.scss']
})
export class EditPredefinedQuizComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  @Input() public originalQuiz: PredefinedQuizWithResolvedQuestions;
  @Input() public modalRef: NgbModalRef;

  public editedQuiz: PredefinedQuizWithResolvedQuestions;
  public savingEnabled: boolean = false;
  public errorMessage: string;
  public adminToken: string = '';
  public unusedQuestions: QuestionInRawFormat[];

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(private quizService: QuizService,
              private questionService: QuestionService) { }

  ngOnInit(): void {
    // copy original quiz data into edited quiz
    this.editedQuiz = new PredefinedQuizWithResolvedQuestions(
      this.originalQuiz.quizId,
      this.originalQuiz.quizName,
      this.originalQuiz.questionCount,
      this.originalQuiz.resolvedQuestions.slice()   // copy array with slice()
    );

    // init unused questions
    this.questionService.getAllQuestions()
      .then(allQuestions => {

        // fill array of unused questions
        this.unusedQuestions = allQuestions.filter(q => {

          // remove all questions that are already used in the quiz
          for (const usedQuestion of this.originalQuiz.resolvedQuestions) {
            if (q.id == usedQuestion.id) {
              return false;
            }
          }

          // question is unused, so it should stay in the array
          return true;
        });

        // sort questions by id
        this.unusedQuestions.sort((q1, q2) => {
          return q1.id - q2.id;
        })
      })
      .catch( (err: HttpErrorResponse) => {
        // show error message
        console.log('Error while fetching the unused questions: ', err);
        if (err.status != 0) {
          this.errorMessage = err.error as string;
        } else {
          this.errorMessage = $localize `:@@errorBackendNotReachable:The server is not reachable.`;
        }
      });
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
      this.errorMessage = $localize `:@@errorEmptyInputFields:The shown input fields must not be empty.`;
    } else {
      this.errorMessage = undefined;
    }
  }

  /*======================================*
   * SAVING
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
      .then(response => {
        console.log('Response: ', response);
        alert(response);
        this.modalRef.close(this.editedQuiz);
      })
      .catch( (err: HttpErrorResponse) => {
        // show error message
        console.log('Error while saving the Quiz: ', err);
        if (err.status != 0) {
          this.errorMessage = err.error as string;
        } else {
          this.errorMessage = $localize `:@@errorBackendNotReachable:The server is not reachable.`;
        }
      });
  }

  /*======================================*
   * CHANGE USED AND UNUSED QUESTIONS
   *======================================*/

  /**
   * Adds the question to the edited quiz array and adjusts the related values.
   *
   * @param idxUnusedQuestions the index of the question inside the array 'this.unusedQuestions'
   */
  addQuestion(idxUnusedQuestions: number) {
    // add to used questions
    this.editedQuiz.resolvedQuestions.push(this.unusedQuestions[idxUnusedQuestions]);
    this.editedQuiz.questionCount++;

    // remove from unused questions
    this.unusedQuestions.splice(idxUnusedQuestions, 1);
  }

  /**
   * Removes the question from the edited quiz array and adjusts the related values.
   * Sorts the unused questions by id.
   *
   * @param idxResolvedQuestions the index of the question inside the array 'this.editedQuiz.resolvedQuestions'
   */
  removeQuestion(idxResolvedQuestions: number) {
    // add to unused questions
    this.unusedQuestions.push(this.editedQuiz.resolvedQuestions[idxResolvedQuestions]);

    // sort unused questions by question id
    this.unusedQuestions.sort((q1, q2) => {
      return q1.id - q2.id;
    });

    // remove from used questions
    this.editedQuiz.resolvedQuestions.splice(idxResolvedQuestions, 1);
    this.editedQuiz.questionCount--;
  }

  /**
   * Swaps the question at the given position inside the resolved questions array with the previous question inside
   * this array.
   *
   * @param idxResolvedQuestions the index of the question to swap with the previous question
   */
  swapQuestionWithPredecessor(idxResolvedQuestions: number) {
    const questionToSwap = this.editedQuiz.resolvedQuestions[idxResolvedQuestions-1];
    this.editedQuiz.resolvedQuestions[idxResolvedQuestions-1] = this.editedQuiz.resolvedQuestions[idxResolvedQuestions];
    this.editedQuiz.resolvedQuestions[idxResolvedQuestions] = questionToSwap;
  }

  /**
   * Swaps the question at the given position inside the resolved questions array with the next question inside
   * this array.
   *
   * @param idxResolvedQuestions the index of the question to swap with the next question
   */
  swapQuestionWithSuccessor(idxResolvedQuestions: number) {
    const questionToSwap = this.editedQuiz.resolvedQuestions[idxResolvedQuestions+1];
    this.editedQuiz.resolvedQuestions[idxResolvedQuestions+1] = this.editedQuiz.resolvedQuestions[idxResolvedQuestions];
    this.editedQuiz.resolvedQuestions[idxResolvedQuestions] = questionToSwap;
  }
}
