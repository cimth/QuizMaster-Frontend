import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL} from '../../constants/web-requests';
import {QuestionInPlayFormat, QuestionInRawFormat} from '../../model/question';
import {Observable} from 'rxjs';

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
  addQuestion(question: QuestionInRawFormat, adminToken: string): Observable<QuestionInRawFormat> {

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
    return this.httpClient.post<QuestionInRawFormat>(url, body, httpOptions);
  }

  /*======================================*
   * READ QUESTIONS
   *======================================*/

  /**
   * Requests all questions from the server and returns an Observable for this request.
   *
   * @return an Observable for all questions
   */
  public getAllQuestions(): Observable<QuestionInRawFormat[]> {
    return this.httpClient.get<QuestionInRawFormat[]>(URL.QUESTION_ENDPOINT);
  }

  /**
   * Requests the question with the given id from the server and returns an Observable for the fetched question.
   *
   * @param questionId the question to fetch
   *
   * @return an Observable of the fetched question
   */
  public getQuestionInRawFormat(questionId: number): Observable<QuestionInRawFormat> {
    const url = `${URL.QUESTION_ENDPOINT}/${questionId}`;
    return this.httpClient.get<QuestionInRawFormat>(url);
  }

  /**
   * Requests the question with the given id from the server and returns an Observable for the fetched question.
   *
   * @param questionId the question to fetch
   *
   * @return an Observable of the fetched question
   */
  public getQuestionInPlayFormat(questionId: number): Observable<QuestionInPlayFormat> {
    const url = `${URL.QUESTION_ENDPOINT}/${questionId}/playFormat`;
    return this.httpClient.get<QuestionInPlayFormat>(url);
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
  public saveUpdatedQuestion(question: QuestionInRawFormat, adminToken: string): Observable<string> {

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
      responseType: 'text' as const       // necessary for processing the response correctly
    }

    // do request and return Observable
    return this.httpClient.put(url, body, httpOptions);
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
  public deleteQuestion(questionId: number, adminToken: string): Observable<string> {

    // prepare request
    const url = `${URL.QUESTION_ENDPOINT}/${questionId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': adminToken  // admin token from backend console
      }),
      responseType: 'text' as const  // necessary for processing the response correctly
    }

    // do request and return Observable
    return this.httpClient.delete(url, httpOptions);
  }
}
