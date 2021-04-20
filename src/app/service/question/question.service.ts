import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL} from '../../constants/web-requests';
import {QuestionInRawFormat} from '../../model/question';
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
   * Returns an Observable for this request.
   * <br/>
   * Needs the Admin Token from the backend console to work.
   *
   * @param question the question to add
   * @param adminToken the Admin Token from the backend console
   */
  addQuestion(question: QuestionInRawFormat, adminToken: string) {

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
        'Authorization': adminToken                 // admin token from backend console
      }),
      responseType: 'arraybuffer' as 'arraybuffer'  // necessary for processing the response correctly
    }

    // do request and return Observable
    return this.httpClient.post(url, body, httpOptions);
  }

  /*======================================*
   * READ QUESTIONS
   *======================================*/

  /**
   * Requests all questions from the server and returns an Observable for this request.
   */
  public getAllQuestions(): Observable<any> {
    return this.httpClient.get(URL.QUESTION_ENDPOINT);
  }

  /**
   * Requests the question with the given id from the server and returns an Observable for the result object.
   * @param questionId
   */
  public getQuestionInRawFormat(questionId: number): Observable<QuestionInRawFormat> {
    const url = `${URL.QUESTION_ENDPOINT}/${questionId}`;
    return this.httpClient.get<QuestionInRawFormat>(url);
  }

  /*======================================*
   * UPDATE QUESTION
   *======================================*/

  /**
   * Saves the given question at the backend.
   * Returns an Observable for this request.
   * <br/>
   * Needs the Admin Token from the backend console to work.
   *
   * @param question the updated question
   * @param adminToken the Admin Token from the backend console
   */
  public saveUpdatedQuestion(question: QuestionInRawFormat, adminToken: string): Observable<any> {

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
        'Authorization': adminToken                 // admin token from backend console
      }),
      responseType: 'arraybuffer' as 'arraybuffer'  // necessary for processing the response correctly
    }

    // do request and return Observable
    return this.httpClient.put(url, body, httpOptions);
  }

  /*======================================*
   * DELETE QUESTION
   *======================================*/

  /**
   * Deletes the question given by its id.
   * Returns an Observable for this request.
   * <br/>
   * Needs the Admin Token from the backend console to work.
   *
   * @param questionId the id of the question to be deleted
   * @param adminToken the Admin Token from the backend console
   */
  public deleteQuestion(questionId: number, adminToken: string): Observable<any> {

    // prepare request
    const url = `${URL.QUESTION_ENDPOINT}/${questionId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': adminToken                 // admin token from backend console
      }),
      responseType: 'arraybuffer' as 'arraybuffer'  // necessary for processing the response correctly
    }

    // do request and return Observable
    return this.httpClient.delete(url, httpOptions);
  }
}
