import {Component, Input, OnInit} from '@angular/core';
import {PredefinedQuizWithResolvedQuestions} from '../../../model/PredefinedQuizWithResolvedQuestions';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {QuestionInRawFormat} from '../../../model/QuestionInRawFormat';
import {QuizService} from '../../../service/quiz/quiz.service';
import {QuestionService} from '../../../service/question/question.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-predefined-quiz',
  templateUrl: './add-predefined-quiz.component.html',
  styleUrls: ['./add-predefined-quiz.component.scss']
})
export class AddPredefinedQuizComponent implements OnInit {

  /*======================================*
  * FIELDS
  *======================================*/

  @Input() public modalRef: NgbModalRef;

  public newQuiz: PredefinedQuizWithResolvedQuestions;
  public savingEnabled: boolean = false;
  public errorMessage: string;
  public adminToken: string = '';
  public unusedQuestions: QuestionInRawFormat[] = [];

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private router: Router) { }

  ngOnInit(): void {

    // init new quiz
    this.newQuiz = new PredefinedQuizWithResolvedQuestions(undefined, '', 0, []);

    // init unused questions
    this.questionService.getAllQuestions()
      .then(allQuestions => {

        // fill array of unused questions
        this.unusedQuestions = allQuestions.filter(q => {

          // remove all questions that are already used in the quiz
          for (const usedQuestion of this.newQuiz.resolvedQuestions) {
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
      .catch( (err : HttpErrorResponse) => {
        // go to backend-not-reachable page when connection fails
        console.log('Error while fetching unused questions: ', err)
        if (err.status == 0) {
          this.modalRef.dismiss();
          setTimeout(() => {
            void this.router.navigateByUrl('/backend-not-reachable');
          }, 1500);
        }
      });
  }

  /*======================================*
   * VALIDATION FOR COMPONENT
   *======================================*/

  /**
   * Only enable the button for saving the created quiz if the necessary fields are filled.
   * Show an error message if there is any field not filled after any input update.
   */
  enableOrDisableSaveButtonAccordingToInput() {
    // only enable saving if all fields are filled
    this.savingEnabled = this.adminToken.trim().length > 0
                            && this.newQuiz.quizName.trim().length > 0;

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
   * Saves the new quiz at the backend.
   * If an error occurs, the error message will be displayed in the component.
   */
  saveQuiz(): void {
    // reset error message
    this.errorMessage = undefined;

    console.log('Add: ', this.newQuiz);

    // create (empty) quiz and update it for adding the selected questions to it
    this.quizService.addQuiz(this.newQuiz.quizName, this.adminToken)
      .then(createdQuiz => {

        // add id of new question to new question object
        console.log('Response: ', createdQuiz);
        this.newQuiz.quizId = createdQuiz.quizId;

        // add questions to the created quiz (separate update quiz)
        this.quizService.saveUpdatedQuiz(this.newQuiz, this.adminToken)
          .then(successMessage => {

            // show success message
            console.log('Response: ', successMessage);
            const dialogMessage = $localize `:@@successQuizCreated:The Quiz was successfully created!`;
            alert(dialogMessage);

            // close modal and return new quiz with added id
            this.modalRef.close(this.newQuiz);

          })
          .catch( (err: HttpErrorResponse) => {
            // show error message
            console.log('Error while saving the questions of the Quiz: ', err)
            if (err.status != 0) {
              this.errorMessage = err.error as string;
            } else {
              this.errorMessage = $localize `:@@errorBackendNotReachable:The server is not reachable.`;
            }
          });

      })
      .catch( (err: HttpErrorResponse) => {
        // show error message
        console.log('Error while saving the Quiz: ', err)
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
    this.newQuiz.resolvedQuestions.push(this.unusedQuestions[idxUnusedQuestions]);
    this.newQuiz.questionCount++;

    // remove from unused questions
    this.unusedQuestions.splice(idxUnusedQuestions, 1);
  }

  /**
   * Removes the question from the quiz array and adjusts the related values.
   * Sorts the unused questions by id.
   *
   * @param idxResolvedQuestions the index of the question inside the array 'this.newQuiz.resolvedQuestions'
   */
  removeQuestion(idxResolvedQuestions: number) {
    // add to unused questions
    this.unusedQuestions.push(this.newQuiz.resolvedQuestions[idxResolvedQuestions]);

    // sort unused questions by question id
    this.unusedQuestions.sort((q1, q2) => {
      return q1.id - q2.id;
    });

    // remove from used questions
    this.newQuiz.resolvedQuestions.splice(idxResolvedQuestions, 1);
    this.newQuiz.questionCount--;
  }

  /**
   * Swaps the question at the given position inside the resolved questions array with the previous question inside
   * this array.
   *
   * @param idxResolvedQuestions the index of the question to swap with the previous question
   */
  swapQuestionWithPredecessor(idxResolvedQuestions: number) {
    const questionToSwap = this.newQuiz.resolvedQuestions[idxResolvedQuestions-1];
    this.newQuiz.resolvedQuestions[idxResolvedQuestions-1] = this.newQuiz.resolvedQuestions[idxResolvedQuestions];
    this.newQuiz.resolvedQuestions[idxResolvedQuestions] = questionToSwap;
  }

  /**
   * Swaps the question at the given position inside the resolved questions array with the next question inside
   * this array.
   *
   * @param idxResolvedQuestions the index of the question to swap with the next question
   */
  swapQuestionWithSuccessor(idxResolvedQuestions: number) {
    const questionToSwap = this.newQuiz.resolvedQuestions[idxResolvedQuestions+1];
    this.newQuiz.resolvedQuestions[idxResolvedQuestions+1] = this.newQuiz.resolvedQuestions[idxResolvedQuestions];
    this.newQuiz.resolvedQuestions[idxResolvedQuestions] = questionToSwap;
  }

}
