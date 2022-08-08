export class PredefinedQuiz {

  /*======================================*
   * FIELDS
   *======================================*/

  private _quizId: number;
  private _quizName: string;
  private _questionCount: number;

  /*======================================*
   * INITIALIZATION
   *======================================*/

  constructor(quizId: number, quizName: string, questionCount: number) {
    this._quizId = quizId;
    this._quizName = quizName;
    this._questionCount = questionCount;
  }

  /*======================================*
   * ACCESSORS
   *======================================*/

  /*
   * quiz id
   */

  get quizId(): number {
    return this._quizId;
  }

  set quizId(value: number) {
    this._quizId = value;
  }

  /*
   * quiz name
   */

  get quizName(): string {
    return this._quizName;
  }

  set quizName(value: string) {
    this._quizName = value;
  }

  /*
   * question count
   */

  get questionCount(): number {
    return this._questionCount;
  }

  set questionCount(value: number) {
    this._questionCount = value;
  }
}
