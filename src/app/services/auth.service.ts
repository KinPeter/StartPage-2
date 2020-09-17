import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginData } from '../interfaces/login-data';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: BehaviorSubject<string>;
  displayName: BehaviorSubject<string>;
  loggedIn: BehaviorSubject<boolean>;

  constructor(
    public fireAuth: AngularFireAuth,
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
      this.fireAuth.signOut();
      this.loggedIn.next(false);
      this.uid.next(null);
      this.displayName.next(null);
    }
  }

  async login(loginData: LoginData): Promise<void> {
    this.spinner.show();
    let response: firebase.auth.UserCredential;
    try {
      response = await this.fireAuth.signInWithEmailAndPassword(
        loginData.email,
        loginData.password
      );
      this.uid.next(response.user.uid);
      this.displayName.next(response.user.displayName);
      this.loggedIn.next(true);
      sessionStorage.setItem('startpageUid', response.user.uid);
      sessionStorage.setItem('startpageDisplayName', response.user.displayName);
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
      await this.fireAuth.signOut();
      this.uid.next(null);
      this.displayName.next(null);
      this.loggedIn.next(false);
      sessionStorage.removeItem('startpageUid');
      sessionStorage.removeItem('startpageDisplayName');
      this.alert.show('Logged out.', 'success');
    } catch (error) {
      this.alert.show("Couldn't log you out. " + error.message, 'danger');
      console.log(error);
    } finally {
      this.spinner.hide();
    }
  }
}
