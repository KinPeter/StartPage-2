import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public isAppLoading: boolean;

    constructor( public spinner: SpinnerService ) {
        this.isAppLoading = false;
    }

    ngOnInit() {
        this.spinner.isSpinning.subscribe((value: boolean) => {
            this.isAppLoading = value;
        });
    }
}
