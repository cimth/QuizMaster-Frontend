import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../service/question/question.service';
import {QuestionInRawFormat} from '../../model/question';
import {LocalizationService} from '../../service/localization/localization.service';
import {MESSAGE_ID} from '../../constants/localization/message-id';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditQuestionComponent} from './edit-question/edit-question.component';
import {DeleteQuestionComponent} from './delete-question/delete-question.component';
import {AddQuestionComponent} from './add-question/add-question.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;
  public allQuestions: QuestionInRawFormat[] = [];
  public showAnswersIds: number[] = [];
  public isLoading: boolean = true;

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public loc: LocalizationService,
              private questionService: QuestionService,
              private modalService: NgbModal,
              private router: Router) { }

  /**
   * Fetches all questions to be shown in the component.
   */
  ngOnInit(): void {
    this.questionService.getAllQuestions()
      .subscribe(allQuestions => {
        console.log(allQuestions);
        for(let q of allQuestions) {
          this.allQuestions.push(q);
        }

        // mark questions as loaded
        // => use timeout to avoid to short (and thus confusing) loading spinner
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      }, err => {
        // go to backend-not-reachable page when connection fails
        console.log('Error while fetching predefined Quizzes: ', err)
        if (err.status == 0) {
          setTimeout(() => {
            this.router.navigateByUrl('/backend-not-reachable');
          }, 1500);
        }
      });
  }

  /*======================================*
   * SHOW / HIDE ANSWERS
   *======================================*/

  /**
   * Adds the given ID to the array of question IDs that is supposed to declare those questions for which
   * the answers are shown and not masked with stars.
   *
   * @param questionId the ID of the question for which the answers should be shown
   */
  showAnswers(questionId: number) {
    this.showAnswersIds.push(questionId);
  }

  /**
   * Removes the given ID from the array of question IDs that is supposed to declare those questions for which
   * the answers are shown and not masked with stars.
   *
   * @param questionId the ID of the question for which the answers should be hidden
   */
  hideAnswers(questionId: number) {
    const index = this.showAnswersIds.indexOf(questionId);
    if (index > -1) {
      this.showAnswersIds.splice(index, 1);
    }
  }

  /*======================================*
   * CREATE QUESTION
   *======================================*/

  /**
   * Opens a modal for adding a question.
   * If the question is added, the UI will be updated too.
   */
  addQuestion() {

    // open modal for creating a new question
    const options = {
      size: 'lg',
      centered: true,
      scrollable: true,
      keyboard: false
    }
    const modal = this.modalService.open(AddQuestionComponent, options);
    modal.componentInstance.modalRef = modal;

    // update UI with edited question data if the question was changed
    modal.result.then(addedQuestion => {
      this.allQuestions.push(addedQuestion);
    }, err => {
      console.log("Closed creation dialog without creating a question.");
    });
  }

  /*======================================*
   * UPDATE QUESTION
   *======================================*/

  /**
   * Opens a modal for editing the question with the given ID and the given array index.
   * If the question is updated, the UI will be updated too.
   *
   * @param questionId the ID of the question
   * @param arrayIndex the array index of the question where the array is 'allQuestions'
   */
  editQuestion(questionId: number, arrayIndex: number) {

    // open modal for editing
    const options = {
      size: 'lg',
      centered: true,
      scrollable: true,
      keyboard: false
    }
    const modal = this.modalService.open(EditQuestionComponent, options);
    modal.componentInstance.originalQuestion = this.allQuestions[arrayIndex];
    modal.componentInstance.modalRef = modal;

    // update UI with edited question data if the question was changed
    modal.result.then(editedQuestion => {
      this.allQuestions[arrayIndex] = editedQuestion;
    }, err => {
      console.log("Closed editing dialog without saving any changes.");
    });
  }

  /*======================================*
   * DELETE QUESTION
   *======================================*/

  /**
   * Opens a modal for confirming that the question with the given ID should be deleted. Inside the dialog
   * the user can also provide the Admin Token needed for this action.
   * If the question is deleted, the UI will be updated too.
   *
   * @param questionId the ID of the question
   * @param arrayIndex the array index of the question where the array is 'allQuestions'
   */
  deleteQuestion(questionId: number, arrayIndex: number) {

    // open modal for confirming the delete operation
    const options = {
      size: 'lg',
      centered: true,
      scrollable: true,
      keyboard: false
    }
    const modal = this.modalService.open(DeleteQuestionComponent, options);
    modal.componentInstance.question = this.allQuestions[arrayIndex];
    modal.componentInstance.modalRef = modal;

    // update UI if the question was deleted
    modal.result.then(deleted => {
      if (deleted === true) {
        this.allQuestions.splice(arrayIndex, 1);
      }
    }, err => {
      console.log("Closed confirmation dialog without deleting the question.");
    });
  }

}
