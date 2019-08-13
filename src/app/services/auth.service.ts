import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginData } from '../interfaces/login-data';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    uid: BehaviorSubject<string>;
    loggedIn: BehaviorSubject<boolean>;

    constructor( public fireAuth: AngularFireAuth ) {
        this.loggedIn = new BehaviorSubject(false);
        this.uid = new BehaviorSubject(null);
        this.checkStorage();
    }

    checkStorage(): void {
        const storedId = sessionStorage.getItem('startpageUid');
        console.log(storedId);
        if (storedId) {
            this.loggedIn.next(true);
            this.uid.next(storedId);
        } else {
            this.fireAuth.auth.signOut();
            this.loggedIn.next(false);
            this.uid.next(null);
        }
    }

    login(loginData: LoginData): void {
        this.fireAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
        .then((response) => {
            console.log(response);
            this.uid.next(response.user.uid);
            this.loggedIn.next(true);
            sessionStorage.setItem('startpageUid', response.user.uid);
        });
    }

    logout(): void {
        this.fireAuth.auth.signOut()
        .then((response) => {
            console.log(response);
            this.uid.next(null);
            this.loggedIn.next(false);
            sessionStorage.removeItem('startpageUid');
        });
    }
}
