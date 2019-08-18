import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { LinkTagsService } from 'src/app/services/link-tags.service';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Link } from 'src/app/interfaces/link';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-links-container',
    templateUrl: './links-container.component.html',
    styleUrls: ['./links-container.component.scss']
})
export class LinksContainerComponent implements OnInit {

    public isOpen: boolean;
    public tagsArray: Array<any>;
    public results: Link[];
    public hasResults: boolean;
    public isLoggedIn: boolean;

    constructor(
        public linkService: LinksService,
        public auth: AuthService,
        public lt: LinkTagsService,
        public alert: AlertService,
        public spinner: SpinnerService
    ) {
        this.isOpen = false;
        this.results = [];
        this.hasResults = false;
    }

    ngOnInit() {
        this.tagsArray = Object.entries(this.lt.tags);
        this.linkService.linkResults.subscribe((result: Link[]) => {
            console.log(result);
            this.results = result;
            this.hasResults = true;
        });
        this.auth.loggedIn.subscribe((value) => {
            this.isLoggedIn = value;
        });
    }

    toggleView(): void {
        this.isOpen = !this.isOpen;
    }

    loadLinksByTag(tag: string): void {
        this.linkService.fetchLinksByTag(tag);
    }

    onAddLink(): void {

    }

    onSearchLink(): void {

    }

    onCloseResults(): void {
        this.results = [];
        this.hasResults = false;
    }
}
