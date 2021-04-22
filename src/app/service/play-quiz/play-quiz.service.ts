import {Injectable} from '@angular/core';
import {PredefinedQuiz} from '../../model/quiz';
import {QuizService} from '../quiz/quiz.service';
import {QuestionService} from '../question/question.service';

@Injectable({
  providedIn: 'root'
})
export class PlayQuizService {

  /*======================================*
   * CONSTRUCTOR
   *======================================*/

  constructor(private quizService: QuizService,
              private questionService: QuestionService) { }

  /*======================================*
   * START QUIZ
   *======================================*/

  public startRandomQuiz(questionCount: number) {
    console.log(`Start random quiz with ${questionCount} questions`);
  }

  public startPredefinedQuiz(quiz: PredefinedQuiz) {
    console.log('Start predefined quiz: ', quiz);
  }
}
