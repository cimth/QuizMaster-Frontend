import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../service/question/question.service';
import {QuestionInRawFormat} from '../../model/question';
import {LocalizationService} from '../../service/localization/localization.service';
import {MESSAGE_ID} from '../../constants/localization/message-id';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit {

  public MESSAGE_ID = MESSAGE_ID;
  public allQuestions: QuestionInRawFormat[] = [];

  constructor(public loc: LocalizationService,
              private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getAllQuestions()
      .subscribe((allQuestions: QuestionInRawFormat[]) => {
        console.log(allQuestions);
        for(let q of allQuestions) {
          this.allQuestions.push(q);
        }
      });
  }

}
