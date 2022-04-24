export class QuestionInRawFormat {

  /*======================================*
   * FIELDS
   *======================================*/

  private _id: number;
  private _questionText: string;
  private _correctAnswer: string;
  private _wrongAnswer1: string;
  private _wrongAnswer2: string;
  private _wrongAnswer3: string;

  /*======================================*
   * INITIALIZATION
   *======================================*/

  constructor(id: number, questionText: string, correctAnswer: string, wrongAnswer1: string, wrongAnswer2: string, wrongAnswer3: string) {
    this._id = id;
    this._questionText = questionText;
    this._correctAnswer = correctAnswer;
    this._wrongAnswer1 = wrongAnswer1;
    this._wrongAnswer2 = wrongAnswer2;
    this._wrongAnswer3 = wrongAnswer3;
  }

  /*======================================*
   * ACCESSORS
   *======================================*/

  /*
   * id
   */

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  /*
   * question text
   */

  get questionText(): string {
    return this._questionText;
  }

  set questionText(value: string) {
    this._questionText = value;
  }

  /*
   * correct answer
   */

  get correctAnswer(): string {
    return this._correctAnswer;
  }

  set correctAnswer(value: string) {
    this._correctAnswer = value;
  }

  /*
   * wrong answer 1
   */

  get wrongAnswer1(): string {
    return this._wrongAnswer1;
  }

  set wrongAnswer1(value: string) {
    this._wrongAnswer1 = value;
  }

  /*
   * wrong answer 2
   */

  get wrongAnswer2(): string {
    return this._wrongAnswer2;
  }

  set wrongAnswer2(value: string) {
    this._wrongAnswer2 = value;
  }

  /*
   * wrong answer 2
   */

  get wrongAnswer3(): string {
    return this._wrongAnswer3;
  }

  set wrongAnswer3(value: string) {
    this._wrongAnswer3 = value;
  }
}
