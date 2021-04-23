import {Injectable} from '@angular/core';
import {PredefinedQuiz} from '../../model/quiz';
import {QuizService} from '../quiz/quiz.service';
import {QuestionService} from '../question/question.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {QuizState} from '../../model/quiz-state';
import {LocalizationService} from '../localization/localization.service';
import {MESSAGE_ID} from '../../constants/localization/message-id';

@Injectable({
  providedIn: 'root'
})
export class PlayQuizService {

  /*======================================*
   * FIELDS
   *======================================*/

  private MESSAGE_ID = MESSAGE_ID;

  private _quizState: QuizState;

  /*======================================*
   * CONSTRUCTOR
   *======================================*/

  constructor(private loc: LocalizationService,
              private quizService: QuizService,
              private questionService: QuestionService,
              private router: Router,
              private localStorageService: LocalStorageService) { }

  /*======================================*
   * START QUIZ
   *======================================*/

  /**
   * Starts a random quiz by initializing the quiz state and navigating to the 'play quiz' page.
   *
   * @param questionCount the question count for the random quiz
   */
  public startRandomQuiz(questionCount: number) {
    console.log(`Start random quiz with ${questionCount} questions`);

    const randomQuizName = this.loc.localize(MESSAGE_ID.INFO.RANDOM_QUIZ_NAME);

    this.quizService.getRandomQuiz(questionCount)
      .subscribe(questionIds => {
        this.initQuizState(randomQuizName, questionIds);
        this.router.navigateByUrl('/play-quiz');
      });
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
        this.initQuizState(quiz.quizName, questionIds);
        this.router.navigateByUrl('/play-quiz');
      });
  }

  /**
   * Initializes the quiz state with the given question ids to start a quiz.
   *
   * @param quizName the name of the quiz to be played
   * @param questionIds the question ids of the quiz to be played
   * @private
   */
  private initQuizState(quizName: string, questionIds: number[]) {
    this.quizState.quizName = quizName;
    this.quizState.questionIds = questionIds;
    this.quizState.currentIndex = 0;
    this.quizState.wrongAnswers = 0;
    this.quizState.correctAnswers = 0;
    this.quizState.clearCurrentQuestion();
    this.quizState.clearSelectedAnswer();
  }

  /*======================================*
   * UPDATE QUIZ STATE
   *======================================*/

  /**
   * Updates the quiz state to provide the next question.
   * Therefore clears values from the previous question and updates the index to point to the next question.
   */
  public updateForNextQuestion() {
    this.quizState.currentIndex++;
    this.quizState.clearCurrentQuestion();
    this.quizState.clearSelectedAnswer();
  }

  /**
   * Increments the count of correct or wrong answers according to the correctness of the given answer.
   *
   * @param correctAnswer true if answered correctly, else false
   */
  public updateAnswerCount(correctAnswer: boolean) {
    if (correctAnswer) {
      this.quizState.correctAnswers++;
    } else {
      this.quizState.wrongAnswers++;
    }
  }

  /*======================================*
   * END QUIZ
   *======================================*/

  /**
   * Clears the quiz state.
   * @private
   */
  public clearQuizState() {
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
