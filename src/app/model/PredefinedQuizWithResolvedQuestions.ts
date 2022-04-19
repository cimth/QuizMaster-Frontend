import {QuestionInRawFormat} from './QuestionInRawFormat';

export class PredefinedQuizWithResolvedQuestions {

  /*======================================*
   * FIELDS
   *======================================*/

  private _quizId: number;
  private _quizName: string;
  private _questionCount: number;
  private _resolvedQuestions: QuestionInRawFormat[];

  /*======================================*
   * INITIALIZATION
   *======================================*/

  constructor(quizId: number, quizName: string, questionCount: number, resolvedQuestions: QuestionInRawFormat[]) {
    this._quizId = quizId;
    this._quizName = quizName;
    this._questionCount = questionCount;
    this._resolvedQuestions = resolvedQuestions;
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

  /*
   * resolved questions
   */

  get resolvedQuestions(): QuestionInRawFormat[] {
    return this._resolvedQuestions;
  }

  set resolvedQuestions(value: QuestionInRawFormat[]) {
    this._resolvedQuestions = value;
  }
}
