import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from '../../constants/web-requests';
import {PredefinedQuiz, PredefinedQuizWithResolvedQuestions} from '../../model/quiz';

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
  public getQuestionIdsOfPredefinedQuiz(quizId: number): Observable<number[]> {
    const url = `${URL.QUIZ_ENDPOINT}/${quizId}`;
    return this.httpClient.get<number[]>(url);
  }

  /*======================================*
   * DELETE PREDEFINED QUIZ
   *======================================*/

  /**
   * Deletes the predefined quiz given by its id.
   * Returns an Observable for the success message.
   * <br/>
   * Needs the Admin Token from the backend console to work.
   *
   * @param quizId the id of the predefined quiz to be deleted
   * @param adminToken the Admin Token from the backend console
   *
   * @return an Observable for the success message
   */
  public deletePredefinedQuiz(quizId: number, adminToken: string) {

    // prepare request
    const url = `${URL.QUIZ_ENDPOINT}/${quizId}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': adminToken  // admin token from backend console
      }),
      responseType: 'text' as const  // necessary for processing the response correctly
    }

    // do request and return Observable
    return this.httpClient.delete(url, httpOptions);
  }

  /*======================================*
   * UPDATE PREDEFINED QUIZ
   *======================================*/

  /**
   * Saves the given predefined quiz at the backend.
   * Returns an Observable for the success message.
   * <br/>
   * Needs the Admin Token from the backend console to work.
   *
   * @param quiz the updated quiz
   * @param adminToken the Admin Token from the backend console
   *
   * @return an Observable for the success message
   */
  saveUpdatedQuiz(quiz: PredefinedQuizWithResolvedQuestions, adminToken: string): Observable<string> {

    // prepare request
    const url = `${URL.QUIZ_ENDPOINT}/${quiz.quizId}`;

    const questionIds = [];
    quiz.resolvedQuestions.forEach(q => {
      questionIds.push(q.id);
    });

    const body = {
      quizName: quiz.quizName,
      quizQuestions: questionIds
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
}
