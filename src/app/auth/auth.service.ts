import { User } from './user.model';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    private user: User;

     constructor( private router: Router, private afauth: AngularFireAuth) {}

     registerUser(authData: AuthData  ) {

           this.afauth.auth.createUserWithEmailAndPassword(
             authData.email,
             authData.password)
             .then(result => {
                 console.log(result);
             })
             .catch(error => {
             console.log(error);
             });

           this.router.navigate(['/']);
           this.authChange.next(true);
        }


        // this.user = {

        //     userTelNo: authData.telNo,
        //     userID: Math.round(Math.random() * 1000).toString()
        //     // this.router.navigator(['/gigs']);
       // };

    login(authData: AuthData ) {

        // this.user = {

        //     userEmail: authData.email,
        //     userID: Math.round(Math.random() * 1000).toString()
        // };

       

    }

    logout() {

        this.user = null;
        this.authChange.next(false);
    }

    getUser() {
        return {...this.user};
    }

    isAuth() {
        return this.user != null;
    }
}
