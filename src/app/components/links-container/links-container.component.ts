import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { LinkTagsService } from 'src/app/services/link-tags.service';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Link } from 'src/app/interfaces/link';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-links-container',
    templateUrl: './links-container.component.html',
    styleUrls: ['./links-container.component.scss']
})
export class LinksContainerComponent implements OnInit {

    isOpen: boolean;
    tagsArray: Array<any>;
    results: Subject<Link[]>;

    constructor(
        public linkService: LinksService,
        public lt: LinkTagsService,
        public alert: AlertService,
        public spinner: SpinnerService
    ) {
        this.isOpen = false;
        this.results = new Subject(); // elég csak a result componentben??
    }

    ngOnInit() {
        this.tagsArray = Object.entries(this.lt.tags);
        this.linkService.linkResults.subscribe((result: Link[]) => { // elég csak a result componentben??
            console.log(result);
            this.results.next(result);
        });
    }

    toggleView(): void {
        this.isOpen = !this.isOpen;
    }

    loadLinksByTag(tag: string): void {
        this.linkService.fetchLinksByTag(tag);
    }

}
