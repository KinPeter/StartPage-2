import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('f', { static: true }) loginForm: NgForm;

    isLoggingIn = false;
    isLoggedIn: boolean;
    loginData: LoginData = {email: '', password: ''};

    constructor( public auth: AuthService ) { }

    ngOnInit() {
        this.checkAuthStatus();
        console.log('logged in?', this.isLoggedIn);

        // FOR TESTING
        setTimeout(() => {
            this.loginForm.setValue({email: 'kinpeter85@gmail.com', password: 'petike1205'});
        }, 1000);
    }

    checkAuthStatus(): void {
        this.auth.loggedIn.subscribe((value) => {
            this.isLoggedIn = value;
        });
    }

    login(): void {
        this.isLoggingIn = true;
    }

    logout(): void {
        this.auth.logout();
    }

    onSubmit(): void {
        console.log(this.loginForm);
        this.loginData.email = this.loginForm.value.email;
        this.loginData.password = this.loginForm.value.password;
        this.isLoggingIn = false;
        this.auth.login(this.loginData);
        this.loginForm.reset();
    }
}
