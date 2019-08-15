import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginData } from '../interfaces/login-data';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    uid: BehaviorSubject<string>;
    loggedIn: BehaviorSubject<boolean>;

    constructor(
            public fireAuth: AngularFireAuth,
            public spinner: SpinnerService,
            public alert: AlertService
        ) {
        this.loggedIn = new BehaviorSubject(false);
        this.uid = new BehaviorSubject(null);
        this.checkStorage();
    }

    checkStorage(): void {
        const storedId = sessionStorage.getItem('startpageUid');
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
        this.spinner.show();
        this.fireAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
        .then((response: firebase.auth.UserCredential) => {
            // console.log(response);
            this.uid.next(response.user.uid);
            this.loggedIn.next(true);
            sessionStorage.setItem('startpageUid', response.user.uid);
            this.spinner.hide();
            this.alert.show('Logged in successfully', 'success');
        })
        .catch((error: any) => {
            this.spinner.hide();
            this.alert.show('Login failed. ' + error.message, 'danger');
            console.log(error);
        });
    }

    logout(): void {
        this.spinner.show();
        this.fireAuth.auth.signOut()
        .then(() => {
            this.uid.next(null);
            this.loggedIn.next(false);
            sessionStorage.removeItem('startpageUid');
            this.spinner.hide();
            this.alert.show('Logged out.', 'success');
        })
        .catch((error: any) => {
            this.spinner.hide();
            this.alert.show('Couldn\'t log you out. ' + error.message, 'danger');
            console.log(error);
        });
    }
}
