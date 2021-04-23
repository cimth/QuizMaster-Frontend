import {Component} from '@angular/core';
import {PlayQuizService} from '../../../service/play-quiz/play-quiz.service';
import {LocalizationService} from '../../../service/localization/localization.service';
import {MESSAGE_ID} from 'src/app/constants/localization/message-id';
import {Router} from '@angular/router';

@Component({
  selector: 'app-finish-quiz',
  templateUrl: './finish-quiz.component.html',
  styleUrls: ['./finish-quiz.component.css']
})
export class FinishQuizComponent {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;

  /*======================================*
   * CONSTRUCTOR
   *======================================*/

  constructor(public loc: LocalizationService,
              public playQuizService: PlayQuizService,
              private router: Router) { }

  /*======================================*
   * ACTION HANDLING
   *======================================*/

  /**
   * Clears the quiz state data and routes back to the start menu.
   */
  clearQuizStateAndGoToMenu() {
    this.playQuizService.clearQuizState();
    this.router.navigateByUrl('/start');
  }
}
