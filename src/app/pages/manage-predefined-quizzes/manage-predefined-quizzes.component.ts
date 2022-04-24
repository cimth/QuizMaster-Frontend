import {Component, OnInit} from '@angular/core';
import {PredefinedQuizWithResolvedQuestions} from '../../model/PredefinedQuizWithResolvedQuestions';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuizService} from '../../service/quiz/quiz.service';
import {QuestionService} from '../../service/question/question.service';
import {DeletePredefinedQuizComponent} from './delete-predefined-quiz/delete-predefined-quiz.component';
import {EditPredefinedQuizComponent} from './edit-predefined-quiz/edit-predefined-quiz.component';
import {AddPredefinedQuizComponent} from './add-predefined-quiz/add-predefined-quiz.component';
import {Router} from '@angular/router';
import {PredefinedQuiz} from "../../model/PredefinedQuiz";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-manage-predefined-quizzes',
  templateUrl: './manage-predefined-quizzes.component.html',
  styleUrls: ['./manage-predefined-quizzes.component.css']
})
export class ManagePredefinedQuizzesComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  public allQuizzes: PredefinedQuizWithResolvedQuestions[] = [];
  public isLoading: boolean = true;
  public questionsRendered: Map<number, boolean> = new Map<number, boolean>();

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private modalService: NgbModal,
              private router: Router) { }

  /**
   * Fetches all predefined quizzes to be shown in the component.
   * Resolves the questions assigned to every predefined quiz to show their question text inside the quiz accordion.
   */
  async ngOnInit(): Promise<void> {

    // fill temporary array with data
    // => question ids need to be resolved, thus load and resolve all data before initializing the display array
    const quizArray: PredefinedQuizWithResolvedQuestions[] = [];
    await this.quizService.getAllPredefinedQuizzes()
      .then(async allQuizzes => {
        for (const quiz of allQuizzes) {
          const resolvedQuiz = await this.createPredefinedQuizWithResolvedQuestions(quiz);
          quizArray.push(resolvedQuiz);
          this.questionsRendered.set(quiz.quizId, false);
        }
      })
      .catch( (err: HttpErrorResponse) => {
        // go to backend-not-reachable page when connection fails
        console.log('Error while fetching predefined Quizzes: ', err);
        if (err.status == 0) {
          setTimeout(() => {
            void this.router.navigateByUrl('/backend-not-reachable');
          }, 1500);
        }
      });

    // mark quizzes as loaded
    // => use timeout to avoid to short (and thus confusing) loading spinner
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    // init display array after all data are fully loaded
    this.allQuizzes = quizArray;
  }

  /**
   * Creates an extended object containing the data of the given predefined quiz and all resolved questions.
   * Afterwards e.g. the question text can be accessed directly via the created object.
   *
   * @param quiz the predefined quiz with question ids but none resolved questions
   * @private
   */
  private async createPredefinedQuizWithResolvedQuestions(quiz: PredefinedQuiz): Promise<PredefinedQuizWithResolvedQuestions> {

    // init resolved quiz, use empty array for resolved questions to push new resolved questions into it
    const resolvedQuiz = new PredefinedQuizWithResolvedQuestions(
      quiz.quizId,
      quiz.quizName,
      quiz.questionCount,
      []
    );

    // get the question data for the given quiz
    await this.quizService.getQuestionIdsOfPredefinedQuiz(quiz.quizId)
      .then(async questionIds => {
        for (const questionId of questionIds) {
          const resolvedQuestion = await this.questionService.getQuestionInRawFormat(questionId);
          resolvedQuiz.resolvedQuestions.push(resolvedQuestion);
        }
      })
      .catch( (err: HttpErrorResponse) => {
        // go to backend-not-reachable page when connection fails
        console.log('Error while resolving questions: ', err)
        if (err.status == 0) {
          setTimeout(() => {
            void this.router.navigateByUrl('/backend-not-reachable');
          }, 1500);
        }
      });

    // return the fully resolved quiz
    return resolvedQuiz;
  }

  /**
   * Sets the entry for the rendered questions as true for the given quiz id.
   * This means all questions are rendered which is important for showing them and hiding the related loading spinner.
   *
   * @param quizId the id of the quiz for which the questions are rendered
   */
  markQuestionsAsRendered(quizId: number) {
    // use timeout for two reasons:
    // 1) spinner does not disappear to fast what could confuse the user
    // 2) avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.questionsRendered.set(quizId, true);
    }, 1500);
  }

  /*======================================*
   * CREATE QUESTION
   *======================================*/

  /**
   * Opens a modal for adding a predefined quiz.
   * If the quiz is added, the UI will be updated too.
   */
  addQuiz() {

    // open modal for creating a new question
    const options = {
      size: 'lg',
      centered: true,
      scrollable: true,
      keyboard: false
    }
    const modal = this.modalService.open(AddPredefinedQuizComponent, options);

    // pass parameters to the shown component
    const modalComponent = modal.componentInstance as AddPredefinedQuizComponent;
    modalComponent.modalRef = modal;

    // update UI with edited question data if the question was changed
    modal.result.then( (addedQuiz: PredefinedQuizWithResolvedQuestions) => {
      this.allQuizzes.push(addedQuiz);
    }, () => {
      console.log("Closed creation dialog without creating a quiz.");
    });
  }

  /*======================================*
   * UPDATE QUIZ
   *======================================*/

  /**
   * Opens a modal for editing the predefined quiz with the given ID and the given array index.
   * If the quiz is updated, the UI will be updated too.
   *
   * @param quizId the ID of the quiz
   * @param arrayIndex the array index of the quiz where the array is 'allQuizzes'
   */
  editQuiz(quizId: number, arrayIndex: number) {

    // open modal for editing
    const options = {
      size: 'lg',
      centered: true,
      scrollable: true,
      keyboard: false
    }
    const modal = this.modalService.open(EditPredefinedQuizComponent, options);

    // pass parameters to the shown component
    const modalComponent = modal.componentInstance as EditPredefinedQuizComponent;
    modalComponent.originalQuiz = this.allQuizzes[arrayIndex];
    modalComponent.modalRef = modal;

    // update UI with edited quiz data if the quiz was changed
    modal.result.then( (editedQuiz: PredefinedQuizWithResolvedQuestions) => {
      this.allQuizzes[arrayIndex] = editedQuiz;
    }, () => {
      console.log("Closed editing dialog without saving any changes.");
    });
  }

  /*======================================*
   * DELETE QUIZ
   *======================================*/

  /**
   * Opens a modal for confirming that the predefined quiz with the given ID should be deleted. Inside the dialog
   * the user can also provide the Admin Token needed for this action.
   * If the quiz is deleted, the UI will be updated too.
   *
   * @param quizId the ID of the predefined quiz
   * @param arrayIndex the array index of the quiz where the array is 'allQuizzes'
   */
  deleteQuiz(quizId: number, arrayIndex: number) {

    // open modal for confirming the delete operation
    const options = {
      size: 'lg',
      centered: true,
      scrollable: true,
      keyboard: false
    }
    const modal = this.modalService.open(DeletePredefinedQuizComponent, options);

    // pass parameters to the shown component
    const modalComponent = modal.componentInstance as DeletePredefinedQuizComponent;
    modalComponent.quiz = this.allQuizzes[arrayIndex];
    modalComponent.modalRef = modal;

    // update UI if the quiz was deleted
    modal.result.then(deleted => {
      if (deleted === true) {
        this.allQuizzes.splice(arrayIndex, 1);
      }
    }, () => {
      console.log("Closed confirmation dialog without deleting the quiz.");
    });
  }
}
