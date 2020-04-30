import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private authservice: AuthService


    ) {}

  ngOnInit() {

  }


  onSubmit(form: NgForm) {
    this.authservice.registerUser({
    email: form.value.email,
    password: form.value.password
  });
}


}
