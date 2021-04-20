import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from '../../constants/web-requests';
import {PredefinedQuiz} from '../../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  /*======================================*
   * CONSTRUCTOR
   *======================================*/

  constructor(private httpClient: HttpClient) { }

  /*======================================*
   * READ PREDEFINED QUIZZES
   *======================================*/

  /**
   * Requests all predefined quizzes from the server and returns an Observable for this request.
   */
  public getAllPredefinedQuizzes(): Observable<PredefinedQuiz[]> {
    const url = `${URL.QUIZ_ENDPOINT}/predefined`;
    return this.httpClient.get<PredefinedQuiz[]>(url);
  }

  /**
   * Requests the question ids of the predefined quiz given by its id from the server and returns an Observable
   * for this request.
   *
   * @param quizId the id of the predefined quiz
   */
  public getQuestionIdsOfPredefinedQuiz(quizId: number): Observable<any> {
    const url = `${URL.QUIZ_ENDPOINT}/${quizId}`;
    return this.httpClient.get(url);
  }
}
