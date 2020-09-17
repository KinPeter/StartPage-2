import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-link',
  templateUrl: './search-link.component.html',
  styleUrls: ['./search-link.component.scss'],
})
export class SearchLinkComponent implements OnInit, AfterViewInit {
  public closing = false;
  public searchTerm: string;
  @Output() closeSearch = new EventEmitter<void>();
  @ViewChild('f', { static: true }) searchForm: NgForm;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  @ViewChild('elementRef', { static: true }) eRef: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @HostListener('document:click', ['$event']) clickOutside = (event: MouseEvent): void => {};

  constructor(public linkService: LinksService) {}

  ngOnInit() {
    setTimeout(() => {
      // need some delay before assigning listener function to avoid catching the initial click
      this.clickOutside = this.onClickOutsideSearch;
    }, 500);
  }

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }

  onSubmit(): void {
    this.linkService.searchLink(this.searchTerm);
    this.onCloseSearch();
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
