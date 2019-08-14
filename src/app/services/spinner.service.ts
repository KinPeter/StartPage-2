import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    public isSpinning: Subject<boolean>;

    constructor() {
        this.isSpinning = new Subject();
        this.isSpinning.next(false);
    }

    show(): void {
        this.isSpinning.next(true);
    }

    hide(): void {
        this.isSpinning.next(false);
    }
}
