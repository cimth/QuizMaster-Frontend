import {LocalStorageService} from '../service/local-storage/local-storage.service';
import {QUIZ_STATE} from '../constants/local-storage';

export class QuizState {

  /*======================================*
   * FIELDS
   *======================================*/

  private localStorageService: LocalStorageService;

  private _questionIds: number[];
  private _currentIndex: number;
  private _correctAnswers: number;
  private _wrongAnswers: number;

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
  }

  /*======================================*
   * CLEAR LOCAL STORAGE
   *======================================*/

  /**
   * Removes the quiz state data from the local storage.
   */
  public clearData() {
    this.localStorageService.removeKeys([
      QUIZ_STATE.QUESTION_IDS, QUIZ_STATE.CURRENT_INDEX, QUIZ_STATE.CORRECT_ANSWERS, QUIZ_STATE.WRONG_ANSWERS
    ]);
  }

  /*======================================*
   * ACCESSORS
   *======================================*/

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
}
