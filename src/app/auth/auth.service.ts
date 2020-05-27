import { User } from './user.model';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    currentUser = new Subject<string>();
    private user: User;
    private  currentUserDetails: string;

     constructor( private router: Router, private afauth: AngularFireAuth) {}



     innitAuthListener() {
        this.afauth.authState.subscribe(user => {
            if (user) {
               // this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/']);
            } else {
             //   this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['']);
              //  this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData  ) {

        this.afauth.auth.createUserWithEmailAndPassword(
        authData.email,
        authData.password)
        .then(result => {
            console.log(result);
            this.router.navigate(['/']);
            this.authChange.next(true);
            })
        .catch(error => {
            console.log(error);
            });

    }



    login(authData: AuthData ) {

        this.afauth.auth.signInWithEmailAndPassword(
        authData.email,
        authData.password)
        .then(result => {
            console.log(result);
            this.router.navigate(['/']);
            this.authChange.next(true);
        })
        .catch(error => {
            console.log(error);
        });
    }


    logout() {
    this.afauth.auth.signOut();
    this.user = null;
    this.authChange.next(false);
    }

    getUser() {
        return {...this.user};
    }

    isAuth() {
        return this.user != null;
    }

    getUserID() {

        // this.afauth.idToken.subscribe(user => {
        //     this.currentUser.next(user);
        // });

         this.afauth.user.subscribe(user => {
             this.currentUser.next(user.uid);
         });

      //   7q3AeEla9sgJLF7ASdJluBDGKif1

    }

    

}
