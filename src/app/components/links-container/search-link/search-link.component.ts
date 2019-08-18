import { Component, OnInit, Output, EventEmitter, ElementRef, HostListener, ViewChild } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';

@Component({
    selector: 'app-search-link',
    templateUrl: './search-link.component.html',
    styleUrls: ['./search-link.component.scss']
})
export class SearchLinkComponent implements OnInit {

    public closing = false;
    @Output() closeSearch = new EventEmitter<void>();
    @ViewChild('elementRef', {static: true}) eRef: ElementRef;
    @HostListener('document:click', ['$event']) clickOutside = (event: MouseEvent) => {};

    constructor(
        public linkService: LinksService
    ) { }

    ngOnInit() {
        setTimeout(() => {
            // need some delay before assigning listener function to avoid catching the initial click
            this.clickOutside = this.onClickOutsideSearch;
        }, 500);
    }

    onCloseSearch(): void {
        this.closing = true;
        setTimeout(() => {
            this.closeSearch.emit();
        }, 300);
    }

    onClickOutsideSearch(event: MouseEvent): void {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.onCloseSearch();
        }
    }

}
