import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { Link } from 'src/app/interfaces/link';
import { LinksService } from 'src/app/services/links.service';

@Component({
    selector: 'app-link-results',
    templateUrl: './link-results.component.html',
    styleUrls: ['./link-results.component.scss']
})
export class LinkResultsComponent implements OnInit {

    @Input() results: Link[];
    @Output() closeResults = new EventEmitter<void>();
    public closing = false;

    constructor(
        public linkService: LinksService,
        private eRef: ElementRef
    ) { }

    ngOnInit() {
    }

    onCloseResults(): void {
        this.closing = true;
        setTimeout(() => {
            this.closeResults.emit();
        }, 300);
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent): void {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.onCloseResults();
        }
    }

}
