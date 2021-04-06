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
   * GET QUESTIONS
   *======================================*/

  /**
   * Requests all questions from the server and returns an Observable for this request.
   */
  public getAllQuestions(): Observable<any> {
    return this.httpClient.get(URL.QUESTION_ENDPOINT);
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
}
