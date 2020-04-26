import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription, observable, Observable } from 'rxjs';
import { NgForm } from '@angular/forms/src/directives/ng_form';

// import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
// import { ValueConverter } from '@angular/compiler/src/render3/view/template';
// import { map } from 'rxjs/operators';
// // import { UIService } from 'src/app/shared/ui.service';
// // import { Store, State } from '@ngrx/store';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // isLoading$: Observable<boolean>;
  // private loadingSubs: Subscription;

  constructor(
    private authservice: AuthService

    // private uiService: UIService,
    // private store: Store<fromRoot.State>
    ) {}

  ngOnInit() {

  // this.isLoading$ = this.store.select(fromRoot.getIsLoading);
   // if (state => state.ui.isLoading) { this.store.pipe(map(state => state.ui.ui.isLoading)); }
   // this.store.subscribe(data => console.log(data));
  
  //  this.loadingSubs = this.uiService.loadingStateChagne.subscribe(isLoading =>  
  //   this.isLoading = isLoading);
  }


  onSubmit(form: NgForm) {
    this.authservice.login({
    telNo: form.value.telNo,
    password: form.value.password
  });
}


  // ngOnDestroy() {
  //   if (this.loadingSubs) {
  //    this.loadingSubs.unsubscribe();
  //  }
  // }

}
