import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartComponent} from './pages/start/start.component';
import {ManageQuestionsComponent} from './pages/manage-questions/manage-questions.component';
import {ManagePredefinedQuizzesComponent} from './pages/manage-predefined-quizzes/manage-predefined-quizzes.component';
import {SelectQuizFormatComponent} from './pages/select-quiz-format/select-quiz-format.component';
import {PlayQuizComponent} from './pages/play-quiz/play-quiz.component';
import {FinishQuizComponent} from './pages/play-quiz/finish-quiz/finish-quiz.component';
import {BackendNotReachableComponent} from './pages/backend-not-reachable/backend-not-reachable.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'select-quiz-format', component: SelectQuizFormatComponent },
  { path: 'manage-questions', component: ManageQuestionsComponent },
  { path: 'manage-predefined-quizzes', component: ManagePredefinedQuizzesComponent },
  { path: 'play-quiz', component: PlayQuizComponent },
  { path: 'finish-quiz', component: FinishQuizComponent },
  { path: 'backend-not-reachable', component: BackendNotReachableComponent },
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
