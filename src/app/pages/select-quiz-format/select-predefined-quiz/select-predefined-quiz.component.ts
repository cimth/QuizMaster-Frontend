import {Component, Input, OnInit} from '@angular/core';
import {MESSAGE_ID} from 'src/app/constants/localization/message-id';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {LocalizationService} from '../../../service/localization/localization.service';
import {QuizService} from '../../../service/quiz/quiz.service';
import {PredefinedQuiz} from '../../../model/quiz';

@Component({
  selector: 'app-select-predefined-quiz',
  templateUrl: './select-predefined-quiz.component.html',
  styleUrls: ['./select-predefined-quiz.component.css']
})
export class SelectPredefinedQuizComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;

  @Input() public modalRef: NgbModalRef;

  public allPlayableQuizzes: PredefinedQuiz[] = [];
  public isLoading: boolean = true;
  public errorMessage: string = undefined;

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public loc: LocalizationService,
              private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getAllPredefinedQuizzes()
      .subscribe(allQuizzes => {

        // fill array with playable quizzes (at least 1 question)
        this.allPlayableQuizzes = allQuizzes.filter(q => {
          return q.questionCount > 0;
        });

        // sort quizzes by id
        this.allPlayableQuizzes.sort((q1, q2) => {
          return q1.quizId - q2.quizId;
        });

        // mark quizzes as loaded
        // => use timeout to avoid to short (and thus confusing) loading spinner
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      }, err => {
        // show error message
        console.log('Error while fetching the predefined Quizzes: ', err);
        if (err.status != 0) {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = this.loc.localize(MESSAGE_ID.ERRORS.BACKEND_NOT_REACHABLE);
        }
      });
  }

  /*======================================*
   * ACTION FOR SELECTION
   *======================================*/

  /**
   * Returns the selected quiz to the modal's caller.
   *
   * @param quiz the selected quiz
   */
  playQuiz(quiz: PredefinedQuiz) {
    this.modalRef.close(quiz);
  }
}
