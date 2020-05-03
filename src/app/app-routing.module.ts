import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GigCardsComponent } from './gig-cards/gig-cards.component';
import { GigAddComponent } from './gig-add/gig-add.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent} from './auth/signup/signup.component';
import { GigMineComponent} from './gig-mine/gig-mine.component';

const routes: Routes = [

  { path: '', component: GigCardsComponent },
  { path: 'addgigs', component: GigAddComponent},
  { path: 'login', component: LoginComponent},
  { path: 'mygigs', component: GigMineComponent},
  { path: 'signup', component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// const routes: Routes = [

//   { path: '', component: WelcomeComponent },
//   { path: 'training', loadChildren: 'src/app/training/training.module#TrainingModule', canLoad: [AuthGuard]}];


// @NgModule({
//   imports: [AuthModule, RouterModule.forRoot(routes)],
//   exports: [RouterModule],
//   providers: [AuthGuard]
// })
// export class AppRoutingModule { }
