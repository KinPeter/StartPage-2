import { Component, OnInit } from '@angular/core';
import { CloudFunctionsService } from 'src/app/services/cloud-functions.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(
        public cf: CloudFunctionsService
    ) { }

    ngOnInit() {
    }

}
