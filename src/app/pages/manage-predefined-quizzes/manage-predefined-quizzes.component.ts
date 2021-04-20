import {Component, OnInit} from '@angular/core';
import {MESSAGE_ID} from 'src/app/constants/localization/message-id';
import {PredefinedQuiz, PredefinedQuizWithResolvedQuestions} from '../../model/quiz';
import {LocalizationService} from '../../service/localization/localization.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuizService} from '../../service/quiz/quiz.service';
import {QuestionService} from '../../service/question/question.service';

@Component({
  selector: 'app-manage-predefined-quizzes',
  templateUrl: './manage-predefined-quizzes.component.html',
  styleUrls: ['./manage-predefined-quizzes.component.css']
})
export class ManagePredefinedQuizzesComponent implements OnInit {

  /*======================================*
   * FIELDS
   *======================================*/

  public MESSAGE_ID = MESSAGE_ID;
  public allQuizzes: PredefinedQuizWithResolvedQuestions[] = [];

  /*======================================*
   * CONSTRUCTOR AND INITIALIZATION
   *======================================*/

  constructor(public loc: LocalizationService,
              private quizService: QuizService,
              private questionService: QuestionService,
              private modalService: NgbModal) { }

  /**
   * Fetches all predefined quizzes to be shown in the component.
   * Resolves the questions assigned to every predefined quiz to show their question text inside the quiz accordion.
   */
  async ngOnInit(): Promise<void> {

    // fill temporary array with data
    // => question ids need to be resolved, thus load and resolve all data before initializing the display array
    const quizArray = [];
    await this.quizService.getAllPredefinedQuizzes()
      .subscribe(async allQuizzes => {
        console.log(allQuizzes);
        for (let quiz of allQuizzes) {
          const resolvedQuiz = await this.createPredefinedQuizWithResolvedQuestions(quiz);
          quizArray.push(resolvedQuiz);
        }
      });

    // init display array after all data are fully loaded
    this.allQuizzes = quizArray;
  }

  /**
   * Creates an extended object containing the data of the given predefined quiz and all resolved questions.
   * Afterwards e.g. the question text can be accessed directly via the created object.
   *
   * @param quiz the predefined quiz with question ids but none resolved questions
   * @private
   */
  private async createPredefinedQuizWithResolvedQuestions(quiz: PredefinedQuiz): Promise<PredefinedQuizWithResolvedQuestions> {

    // init resolved quiz, use empty array for resolved questions to push new resolved questions into it
    let resolvedQuiz: PredefinedQuizWithResolvedQuestions = {
      quizId: quiz.quizId,
      quizName: quiz.quizName,
      questionCount: quiz.questionCount,
      playable: quiz.playable,
      resolvedQuestions: []
    }

    // get all related quiz ids and resolve questions for them
    await this.quizService.getQuestionIdsOfPredefinedQuiz(quiz.quizId)
      .subscribe(async questionIds => {
        // resolve questions
        for (let questionId of questionIds) {
          await this.questionService.getQuestionInRawFormat(questionId)
            .subscribe(question => {
              resolvedQuiz.resolvedQuestions.push(question);
            })
        }
      });

    // return the fully resolved quiz
    return resolvedQuiz;
  }



}
