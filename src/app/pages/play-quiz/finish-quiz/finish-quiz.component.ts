import {Component} from '@angular/core';
import {PlayQuizService} from '../../../service/play-quiz/play-quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-finish-quiz',
  templateUrl: './finish-quiz.component.html',
  styleUrls: ['./finish-quiz.component.css']
})
export class FinishQuizComponent {

  /*======================================*
   * CONSTRUCTOR
   *======================================*/

  constructor(public playQuizService: PlayQuizService,
              private router: Router) { }

  /*======================================*
   * ACTION HANDLING
   *======================================*/

  /**
   * Clears the quiz state data and routes back to the start menu.
   */
  clearQuizStateAndGoToMenu() {
    this.playQuizService.clearQuizState();
    void this.router.navigateByUrl('/start');
  }
}
