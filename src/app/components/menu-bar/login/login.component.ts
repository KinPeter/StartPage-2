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
    @ViewChild('f', { static: false }) loginForm: NgForm;

    isLoggingIn = false;
    isLoggedIn: boolean;
    loginData: LoginData = {email: '', password: ''};

    constructor( public auth: AuthService ) { }

    ngOnInit() {
        this.checkAuthStatus();
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

    }

    onSubmit(): void {
        console.log(this.loginForm);
        this.loginData.email = this.loginForm.value.email;
        this.loginData.password = this.loginForm.value.password;
        this.loginForm.reset();
        this.isLoggingIn = false;
    }
}
