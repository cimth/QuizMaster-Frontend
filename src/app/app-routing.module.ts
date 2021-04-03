import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartComponent} from './pages/start/start.component';
import {ManageQuestionsComponent} from './pages/manage-questions/manage-questions.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'manage-questions', component: ManageQuestionsComponent },
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
