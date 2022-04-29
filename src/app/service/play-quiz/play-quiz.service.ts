import {Injectable} from '@angular/core';
import {PredefinedQuiz} from '../../model/PredefinedQuiz';
import {QuizService} from '../quiz/quiz.service';
import {QuestionService} from '../question/question.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {QuizState} from '../../model/QuizState';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlayQuizService {

  /*======================================*
   * FIELDS
   *======================================*/

  private _quizState: QuizState;
  private _alreadyUsedQuestions: number[] = [];
  private _totalQuestionCount: number = 0;

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

  /**
   * Starts a random quiz by initializing the quiz state and navigating to the 'play quiz' page.
   *
   * @param questionCount the question count for the random quiz
   */
  public async startRandomQuiz(questionCount: number) {
    console.log(`Start random quiz with ${questionCount} questions`);

    await this.updateTotalQuestionCount();

    const randomQuizName = $localize `:@@randomQuiz:Random Quiz`;

    this.quizService.getRandomQuiz(questionCount, this._alreadyUsedQuestions)
      .then(questionIds => {
        console.log(questionIds)
        this.initQuizState(randomQuizName, questionIds);
        void this.updateAlreadyUsedQuestions(questionIds);
        void this.router.navigateByUrl('/play-quiz');
      })
      .catch( (err: HttpErrorResponse) => {
        // go to backend-not-reachable page when connection fails
        console.log('Error while fetching a random Quiz: ', err)
        if (err.status == 0) {
          setTimeout(() => {
            void this.router.navigateByUrl('/backend-not-reachable');
          }, 1500);
        }
      });
  }

  /**
   * Starts the given predefined quiz by initializing the quiz state and navigating to the 'play quiz' page.
   *
   * @param quiz the predefined quiz to play
   */
  public async startPredefinedQuiz(quiz: PredefinedQuiz) {
    console.log('Start predefined quiz: ', quiz);

    await this.updateTotalQuestionCount();

    this.quizService.getQuestionIdsOfPredefinedQuiz(quiz.quizId)
      .then(questionIds => {
        this.initQuizState(quiz.quizName, questionIds);
        this.updateAlreadyUsedQuestions(questionIds);
        void this.router.navigateByUrl('/play-quiz');
      })
      .catch( (err: HttpErrorResponse) => {
        // go to backend-not-reachable page when connection fails
        console.log('Error while fetching the selected predefined Quiz: ', err)
        if (err.status == 0) {
          setTimeout(() => {
            void this.router.navigateByUrl('/backend-not-reachable');
          }, 1500);
        }
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

  /**
   * Updates the count of all questions existing on the server at the time of the request.
   *
   * @private
   */
  private async updateTotalQuestionCount() {
    await this.questionService.getAllQuestionsCount()
      .then( (questionCount: number) => {
        this._totalQuestionCount = questionCount;
      })
      .catch( (err: HttpErrorResponse) => {
        // go to backend-not-reachable page when connection fails
        console.log('Error while fetching the total question count: ', err)
        if (err.status == 0) {
          setTimeout(() => {
            void this.router.navigateByUrl('/backend-not-reachable');
          }, 1500);
        }
      });
  }

  /*======================================*
   * UPDATE QUIZ STATE
   *======================================*/

  /**
   * Updates the quiz state to provide the next question.
   * Therefor clears values from the previous question and updates the index to point to the next question.
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

  /**
   * Adds the given question IDs to the already used questions array if not already contained.
   * If the array contains all questions, it is cleared because every question was already played and, thus, the
   * cycle for avoiding already played questions begins from new.
   * <br/>
   * This is how new random quizzes can avoid having the same questions when there are left some not already asked
   * questions in the question pool.
   * The actual technique for filtering the already used questions is implemented on the backend.
   *
   * @param questionIds the question ids to add
   * @private
   */
  private updateAlreadyUsedQuestions(questionIds: number[]) {
    for(const questionId of questionIds) {
      if (!this._alreadyUsedQuestions.includes(questionId)) {
        // add if not already contained
        this._alreadyUsedQuestions.push(questionId);

        // clear array if it contains all questions
        if (this._alreadyUsedQuestions.length === this._totalQuestionCount) {
          this._alreadyUsedQuestions = [];
          console.log('Clear already used questions.')
        }
      }
    }

    console.log(`Already used questions: ${this._alreadyUsedQuestions.toString()}`);
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
