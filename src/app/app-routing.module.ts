import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from 'src/services/guard.service';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { QuizComponent } from './quiz/quiz.component';

const routes:  Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "quiz", component: QuizComponent, canActivate: [GuardService]},
  {path: "profil", component: ProfilComponent},
  {path: "**", redirectTo: "/login", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
