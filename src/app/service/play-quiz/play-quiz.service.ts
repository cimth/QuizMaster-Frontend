import {Injectable} from '@angular/core';
import {PredefinedQuiz} from '../../model/quiz';
import {QuizService} from '../quiz/quiz.service';
import {QuestionService} from '../question/question.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {QuizState} from '../../model/quiz-state';

@Injectable({
  providedIn: 'root'
})
export class PlayQuizService {

  /*======================================*
   * FIELDS
   *======================================*/

  // do not use variables with '_' prefix but only setters for correct local storage usage
  private _quizState: QuizState;

  /*======================================*
   * CONSTRUCTOR
   *======================================*/

  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private router: Router,
              private localStorageService: LocalStorageService) { }

  /*======================================*
   * START QUIZ
   *======================================*/

  public startRandomQuiz(questionCount: number) {
    console.log(`Start random quiz with ${questionCount} questions`);
  }

  /**
   * Starts the given predefined quiz by initializing the quiz state and navigating to the 'play quiz' page.
   *
   * @param quiz the predefined quiz to play
   */
  public startPredefinedQuiz(quiz: PredefinedQuiz) {
    console.log('Start predefined quiz: ', quiz);

    this.quizService.getQuestionIdsOfPredefinedQuiz(quiz.quizId)
      .subscribe(questionIds => {
        this.initQuizState(questionIds);
        this.router.navigateByUrl('/play-quiz');
      });
  }

  /**
   * Initializes the quiz state with the given question ids to start a quiz.
   *
   * @param questionIds the question ids of the quiz to be played
   * @private
   */
  private initQuizState(questionIds: number[]) {
    this.quizState.questionIds = questionIds;
    this.quizState.currentIndex = 0;
    this.quizState.wrongAnswers = 0;
    this.quizState.correctAnswers = 0;
  }

  /*======================================*
   * END QUIZ
   *======================================*/

  /**
   * Clears the quiz state.
   * @private
   */
  private clearQuizState() {
    this.quizState.clearData();
  }

  /*======================================*
   * ACCESSORS
   *======================================*/

  get quizState(): QuizState {
    if (this._quizState === undefined) {
      this._quizState = new QuizState(this.localStorageService);
    }
    return this._quizState;
  }

  get currentQuestionId(): number {
    return this.quizState.questionIds[this.quizState.currentIndex];
  }
}
