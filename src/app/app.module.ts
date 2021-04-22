import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {StartComponent} from './pages/start/start.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ManageQuestionsComponent} from './pages/manage-questions/manage-questions.component';
import {EditQuestionComponent} from './pages/manage-questions/edit-question/edit-question.component';
import {FormsModule} from '@angular/forms';
import {DeleteQuestionComponent} from './pages/manage-questions/delete-question/delete-question.component';
import {AddQuestionComponent} from './pages/manage-questions/add-question/add-question.component';
import {ManagePredefinedQuizzesComponent} from './pages/manage-predefined-quizzes/manage-predefined-quizzes.component';
import {DeletePredefinedQuizComponent} from './pages/manage-predefined-quizzes/delete-predefined-quiz/delete-predefined-quiz.component';
import {EditPredefinedQuizComponent} from './pages/manage-predefined-quizzes/edit-predefined-quiz/edit-predefined-quiz.component';
import {AddPredefinedQuizComponent} from './pages/manage-predefined-quizzes/add-predefined-quiz/add-predefined-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ManageQuestionsComponent,
    EditQuestionComponent,
    DeleteQuestionComponent,
    AddQuestionComponent,
    ManagePredefinedQuizzesComponent,
    DeletePredefinedQuizComponent,
    EditPredefinedQuizComponent,
    AddPredefinedQuizComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
