import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertButtonComponent } from './alert-button/alert-button.component';

const routes: Routes = [

  { path: '', component: AlertButtonComponent },
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
