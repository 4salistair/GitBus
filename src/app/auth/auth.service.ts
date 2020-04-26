import { User } from './user.model';
import { AuthData } from './auth.model';

import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    private user: User;

    constructor( private router: Router) {}

    registerUser(authData: AuthData ) {

        this.user = {

            userTelNo: authData.telNo,
            userID: Math.round(Math.random() * 1000).toString()
            // this.router.navigator(['/gigs']);
        };

    }


    login(authData: AuthData ) {

        this.user = {

            userTelNo: authData.telNo,
            userID: Math.round(Math.random() * 1000).toString()
        };

    }

    logout() {

        this.user = null;
    }

    getUser() {
        return {...this.user};
    }

    isAuth() {
        return this.user != null;
    }
}
