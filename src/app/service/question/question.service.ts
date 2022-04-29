import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL} from '../../constants/web-requests';
import {QuestionInRawFormat} from '../../model/QuestionInRawFormat';
import {QuestionInPlayFormat} from "../../model/QuestionInPlayFormat";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  /*======================================*
   * CONSTRUCTOR
   *======================================*/

  constructor(private httpClient: HttpClient) { }

  /*======================================*
   * CREATE QUESTION
   *======================================*/

  /**
   * Adds the given question to the backend.
   * Returns an Observable for this request which contains the created question.
   * <br/>
   * Needs the Admin Token from the backend console to work.
   *
   * @param question the question to add
   * @param adminToken the Admin Token from the backend console
   *
   * @return an Observable for the created question
   */
  addQuestion(question: QuestionInRawFormat, adminToken: string): Promise<QuestionInRawFormat> {

    // prepare request
    const url = URL.QUESTION_ENDPOINT;

    const body = {
      questionText: question.questionText,
      correctAnswer: question.correctAnswer,
      wrongAnswers: [
        question.wrongAnswer1,
        question.wrongAnswer2,
        question.wrongAnswer3
      ]
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': adminToken    // admin token from backend console
      })
    }

    // do request and return Observable
    return this.httpClient.post<QuestionInRawFormat>(url, body, httpOptions).toPromise();
  }

  /*======================================*
   * READ QUESTIONS
   *======================================*/

  /**
   * Requests all questions from the server and returns an Observable for this request.
   *
   * @return an Observable for all questions
   */
  public getAllQuestions(): Promise<QuestionInRawFormat[]> {
    return this.httpClient.get<QuestionInRawFormat[]>(URL.QUESTION_ENDPOINT).toPromise();
  }

  /**
   * Returns the question count of all existing questions on the backend.
   * @return
   */
  public async getAllQuestionsCount(): Promise<number> {
    const url = `${URL.QUESTION_ENDPOINT}/count`;
    return this.httpClient.get<number>(url).toPromise();
  }

  /**
   * Requests the question with the given id from the server and returns an Observable for the fetched question.
   *
   * @param questionId the question to fetch
   *
   * @return an Observable of the fetched question
   */
  public getQuestionInRawFormat(questionId: number): Promise<QuestionInRawFormat> {
    const url = `${URL.QUESTION_ENDPOINT}/${questionId}`;
    return this.httpClient.get<QuestionInRawFormat>(url).toPromise();
  }

  /**
   * Requests the question with the given id from the server and returns an Observable for the fetched question.
   *
   * @param questionId the question to fetch
   *
   * @return an Observable of the fetched question
   */
  public getQuestionInPlayFormat(questionId: number): Promise<QuestionInPlayFormat> {
    const url = `${URL.QUESTION_ENDPOINT}/${questionId}/playFormat`;
    return this.httpClient.get<QuestionInPlayFormat>(url).toPromise();
  }

  /*======================================*
   * UPDATE QUESTION
   *======================================*/

  /**
   * Saves the given question at the backend.
   * Returns an Observable for the success message.
   * <br/>
   * Needs the Admin Token from the backend console to work.
   *
   * @param question the updated question
   * @param adminToken the Admin Token from the backend console
   *
   * @return an Observable for the success message
   */
  public saveUpdatedQuestion(question: QuestionInRawFormat, adminToken: string): Promise<string> {

    // prepare request
    const url = `${URL.QUESTION_ENDPOINT}/${question.id}`;

    const body = {
      questionText: question.questionText,
      correctAnswer: question.correctAnswer,
      wrongAnswers: [
        question.wrongAnswer1,
        question.wrongAnswer2,
        question.wrongAnswer3
      ]
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': adminToken       // admin token from backend console
      }),
      responseType: 'text' as 'json'  // necessary for processing the response correctly
    }

    // do request and return Observable
    return this.httpClient.put<string>(url, body, httpOptions).toPromise();
  }

  /*======================================*
   * DELETE QUESTION
   *======================================*/

  /**
   * Deletes the question given by its id.
   * Returns an Observable for the success message.
   * <br/>
   * Needs the Admin Token from the backend console to work.
   *
   * @param questionId the id of the question to be deleted
   * @param adminToken the Admin Token from the backend console
   *
   * @return an Observable for the success message
   */
  public deleteQuestion(questionId: number, adminToken: string): Promise<string> {

    // prepare request
    const url = `${URL.QUESTION_ENDPOINT}/${questionId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': adminToken  // admin token from backend console
      }),
      responseType: 'text' as 'json'  // necessary for processing the response correctly
    }

    // do request and return Observable
    return this.httpClient.delete<string>(url, httpOptions).toPromise();
  }
}
