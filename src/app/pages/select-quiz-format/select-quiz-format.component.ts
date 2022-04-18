import {Component} from '@angular/core';
import {MESSAGE_ID} from 'src/app/constants/localization/message-id';
import {LocalizationService} from '../../service/localization/localization.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SelectPredefinedQuizComponent} from './select-predefined-quiz/select-predefined-quiz.component';
import {PlayQuizService} from '../../service/play-quiz/play-quiz.service';
import {SelectRandomQuizComponent} from './select-random-quiz/select-random-quiz.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-quiz-format',
  templateUrl: './select-quiz-format.component.html',
  styleUrls: ['./select-quiz-format.component.css']
})
export class SelectQuizFormatComponent {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;

  public isQuizStarting: boolean = false;

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public loc: LocalizationService,
              public playQuizService: PlayQuizService,
              private modalService: NgbModal,
              private router: Router) { }

  /*======================================*
   * STARTED QUIZ
   *======================================*/

  /**
   * Redirects to the play-quiz page where the previous started quiz can be continued.
   */
  continueQuiz(): void {
    void this.router.navigateByUrl('/play-quiz');
  }

  /*======================================*
   * RANDOM QUIZ
   *======================================*/

  /**
   * Opens a modal for selecting a question count for a random quiz to play.
   * If the question count is selected, the quiz is started afterwards.
   */
  selectRandomQuiz(): void {

    // open modal for selecting a predefined quiz
    const options = {
      size: 'md',
      centered: true,
      scrollable: true,
      keyboard: false
    }
    const modal = this.modalService.open(SelectRandomQuizComponent, options);
    modal.componentInstance.modalRef = modal;

    // start quiz if a predefined quiz was selected
    modal.result.then(quizToPlay => {
      this.isQuizStarting = true;
      this.playQuizService.startRandomQuiz(quizToPlay);
    }, err => {
      console.log("Closed selection dialog without starting a quiz.");
    });
  }

  /*======================================*
   * PREDEFINED QUIZ
   *======================================*/

  /**
   * Opens a modal for selecting a predefined quiz to play.
   * If a quiz is selected, it is started afterwards.
   */
  selectPredefinedQuiz(): void {

    // open modal for selecting a predefined quiz
    const options = {
      size: 'md',
      centered: true,
      scrollable: true,
      keyboard: false
    }
    const modal = this.modalService.open(SelectPredefinedQuizComponent, options);
    modal.componentInstance.modalRef = modal;

    // start quiz if a predefined quiz was selected
    modal.result.then(quizToPlay => {
      this.isQuizStarting = true;
      this.playQuizService.startPredefinedQuiz(quizToPlay);
    }, err => {
      console.log("Closed selection dialog without starting a quiz.");
    });
  }
}
