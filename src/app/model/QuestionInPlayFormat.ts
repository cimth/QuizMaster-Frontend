export class QuestionInPlayFormat {

  /*======================================*
   * FIELDS
   *======================================*/

  private _id: number;
  private _questionText: string;
  private _possibleAnswers: [
    {
      answerLetter: string;
      answerText: string;
    }
  ];
  private _correctAnswer: string;

  /*======================================*
   * INITIALIZATION
   *======================================*/

  constructor(id: number, questionText: string, possibleAnswers: [{ answerLetter: string; answerText: string }], correctAnswer: string) {
    this._id = id;
    this._questionText = questionText;
    this._possibleAnswers = possibleAnswers;
    this._correctAnswer = correctAnswer;
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
   * possible answers
   */

  get possibleAnswers(): [{ answerLetter: string; answerText: string }] {
    return this._possibleAnswers;
  }

  set possibleAnswers(value: [{ answerLetter: string; answerText: string }]) {
    this._possibleAnswers = value;
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
}
