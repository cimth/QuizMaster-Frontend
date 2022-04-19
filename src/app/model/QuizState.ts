import {LocalStorageService} from '../service/local-storage/local-storage.service';
import {QUIZ_STATE} from '../constants/local-storage';
import {QuestionInPlayFormat} from "./QuestionInPlayFormat";

export class QuizState {

  /*======================================*
   * FIELDS
   *======================================*/

  private localStorageService: LocalStorageService;

  private _quizName: string;
  private _questionIds: number[];
  private _currentIndex: number;
  private _correctAnswers: number;
  private _wrongAnswers: number;
  private _selectedAnswer: string;
  private _currentQuestion: QuestionInPlayFormat;

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService;
    this.initFromLocalStorage();
  }

  /**
   * Inits the attributes with local storage data if those entries are existing.
   * @private
   */
  private initFromLocalStorage() {

    // quiz name
    if (this.localStorageService.hasKey(QUIZ_STATE.QUIZ_NAME)) {
      this._quizName = this.localStorageService.get(QUIZ_STATE.QUIZ_NAME);
    }

    // question ids
    if (this.localStorageService.hasKey(QUIZ_STATE.QUESTION_IDS)) {
      this._questionIds = this.localStorageService.get(QUIZ_STATE.QUESTION_IDS);
    }

    // current index
    if (this.localStorageService.hasKey(QUIZ_STATE.CURRENT_INDEX)) {
      this._currentIndex = this.localStorageService.get(QUIZ_STATE.CURRENT_INDEX);
    }

    // correct answers
    if (this.localStorageService.hasKey(QUIZ_STATE.CORRECT_ANSWERS)) {
      this._correctAnswers = this.localStorageService.get(QUIZ_STATE.CORRECT_ANSWERS);
    }

    // wrong answers
    if (this.localStorageService.hasKey(QUIZ_STATE.WRONG_ANSWERS)) {
      this._wrongAnswers = this.localStorageService.get(QUIZ_STATE.WRONG_ANSWERS);
    }

    // current question
    if (this.localStorageService.hasKey(QUIZ_STATE.CURRENT_QUESTION)) {
      this._currentQuestion = this.localStorageService.get(QUIZ_STATE.CURRENT_QUESTION);
    }

    // answer selected
    if (this.localStorageService.hasKey(QUIZ_STATE.SELECTED_ANSWER)) {
      this._selectedAnswer = this.localStorageService.get(QUIZ_STATE.SELECTED_ANSWER);
    }
  }

  /*======================================*
   * CLEAR LOCAL STORAGE
   *======================================*/

  /**
   * Removes the current question from the local storage and the quiz state
   */
  clearCurrentQuestion() {
    this.localStorageService.removeKeys([QUIZ_STATE.CURRENT_QUESTION]);
    this._currentQuestion = undefined;
  }

  /**
   * Removes the selected answer from the local storage and the quiz state
   */
  public clearSelectedAnswer() {
    this.localStorageService.removeKeys([QUIZ_STATE.SELECTED_ANSWER]);
    this._selectedAnswer = undefined;
  }

  /**
   * Removes the quiz state data from the local storage and from the quiz state.
   */
  public clearData() {
    this.localStorageService.removeKeys([
      QUIZ_STATE.QUESTION_IDS, QUIZ_STATE.CURRENT_INDEX, QUIZ_STATE.CORRECT_ANSWERS, QUIZ_STATE.WRONG_ANSWERS,
      QUIZ_STATE.CURRENT_QUESTION, QUIZ_STATE.SELECTED_ANSWER
    ]);
    this._questionIds = undefined;
    this._currentIndex = undefined;
    this._correctAnswers = undefined;
    this._wrongAnswers = undefined;
    this._currentQuestion = undefined;
    this._selectedAnswer = undefined;
  }

  /*======================================*
   * ACCESSORS
   *======================================*/

  /*
   * quiz name
   */

  get quizName(): string {
    return this._quizName;
  }

  set quizName(value: string) {
    this.localStorageService.save(QUIZ_STATE.QUIZ_NAME, value);
    this._quizName = value;
  }

  /*
   * question ids
   */

  get questionIds(): number[] {
    return this._questionIds;
  }

  set questionIds(value: number[]) {
    this.localStorageService.save(QUIZ_STATE.QUESTION_IDS, value);
    this._questionIds = value;
  }

  /*
   * current index
   */

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(value: number) {
    this.localStorageService.save(QUIZ_STATE.CURRENT_INDEX, value);
    this._currentIndex = value;
  }

  /*
   * correct answers
   */

  get correctAnswers(): number {
    return this._correctAnswers;
  }

  set correctAnswers(value: number) {
    this.localStorageService.save(QUIZ_STATE.CORRECT_ANSWERS, value);
    this._correctAnswers = value;
  }

  /*
   * wrong answers
   */

  get wrongAnswers(): number {
    return this._wrongAnswers;
  }

  set wrongAnswers(value: number) {
    this.localStorageService.save(QUIZ_STATE.WRONG_ANSWERS, value);
    this._wrongAnswers = value;
  }

  /*
   * current question
   */

  get currentQuestion(): QuestionInPlayFormat {
    return this._currentQuestion;
  }

  set currentQuestion(value: QuestionInPlayFormat) {
    this.localStorageService.save(QUIZ_STATE.CURRENT_QUESTION, value);
    this._currentQuestion = value;
  }

  /*
   * selected answer
   */

  get selectedAnswer(): string {
    return this._selectedAnswer;
  }

  set selectedAnswer(value: string) {
    this.localStorageService.save(QUIZ_STATE.SELECTED_ANSWER, value);
    this._selectedAnswer = value;
  }
}
