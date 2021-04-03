import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL} from '../../constants/web-requests';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  public getAllQuestions() {
    return this.httpClient.get(URL.GET_ALL_QUESTIONS);
  }
}
