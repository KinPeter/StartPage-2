import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginData } from '../interfaces/login-data';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    uid: BehaviorSubject<string>;
    displayName: BehaviorSubject<string>;
    loggedIn: BehaviorSubject<boolean>;

    constructor(
            public spinner: SpinnerService,
            public alert: AlertService
        ) {
        this.loggedIn = new BehaviorSubject(false);
        this.uid = new BehaviorSubject(null);
        this.displayName = new BehaviorSubject(null);
        this.checkStorage();
    }

    checkStorage(): void {
        const storedId = sessionStorage.getItem('startpageUid');
        const storedName = sessionStorage.getItem('startpageDisplayName');
        if (storedId) {
            this.loggedIn.next(true);
            this.uid.next(storedId);
            this.displayName.next(storedName);
        } else {
            this.mockSignOut();
            this.loggedIn.next(false);
            this.uid.next(null);
            this.displayName.next(null);
        }
    }

    async login(loginData: LoginData): Promise<void> {
        this.spinner.show();
        let response: boolean;
        try {
            response = await this.mockSignIn(loginData.email, loginData.password);
            this.uid.next('d3m0u5er123');
            this.displayName.next('Demo User');
            this.loggedIn.next(true);
            sessionStorage.setItem('startpageUid', 'd3m0u5er123');
            sessionStorage.setItem('startpageDisplayName', 'Demo User');
            this.alert.show('Logged in successfully', 'success');
        } catch (error) {
            this.alert.show('Login failed. ' + error.message, 'danger');
            console.log(error);
        } finally {
            this.spinner.hide();
        }
    }

    async logout(): Promise<void> {
        this.spinner.show();
        try {
            await this.mockSignOut();
            this.uid.next(null);
            this.displayName.next(null);
            this.loggedIn.next(false);
            sessionStorage.removeItem('startpageUid');
            sessionStorage.removeItem('startpageDisplayName');
            this.alert.show('Logged out.', 'success');
        } catch (error) {
            this.alert.show('Couldn\'t log you out. ' + error.message, 'danger');
            console.log(error);
        } finally {
            this.spinner.hide();
        }
    }

    private mockSignIn(email: string, password: string): Promise<boolean> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                if (Math.random() > 0.2) {
                    res(true);
                } else {
                    rej(new Error('You were just unlucky. Try again!'));
                }
            }, 500);
        });
    }
    private mockSignOut(): Promise<boolean> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(true);
            }, 500);
        });
    }
}
