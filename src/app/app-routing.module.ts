import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartComponent} from './pages/start/start.component';
import {ManageQuestionsComponent} from './pages/manage-questions/manage-questions.component';
import {ManagePredefinedQuizzesComponent} from './pages/manage-predefined-quizzes/manage-predefined-quizzes.component';
import {SelectQuizFormatComponent} from './pages/select-quiz-format/select-quiz-format.component';
import {PlayQuizComponent} from './pages/play-quiz/play-quiz.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'select-quiz-format', component: SelectQuizFormatComponent },
  { path: 'manage-questions', component: ManageQuestionsComponent },
  { path: 'manage-predefined-quizzes', component: ManagePredefinedQuizzesComponent },
  { path: 'play-quiz', component: PlayQuizComponent },
  { path: '**', redirectTo: 'start', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
