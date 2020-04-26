import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GigCardsComponent } from './gig-cards/gig-cards.component';


const routes: Routes = [

  { path: '', component: GigCardsComponent },

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
