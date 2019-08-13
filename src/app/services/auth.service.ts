import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedIn: Subject<boolean>;

    constructor() {
        this.loggedIn = new Subject();
        this.loggedIn.next(false);
    }
}
