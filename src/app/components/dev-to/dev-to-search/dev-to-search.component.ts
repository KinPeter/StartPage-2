import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dev-to-search',
  templateUrl: './dev-to-search.component.html',
  styleUrls: ['./dev-to-search.component.scss'],
})
export class DevToSearchComponent {
  @ViewChild('search') searchForm: NgForm;

  constructor() {}

  onSubmit(): void {
    const term = encodeURIComponent(this.searchForm.value.searchTerm).trim();
    if (term) {
      window.open('https://dev.to/search?q=' + term, '_blank');
    } else {
      window.open('https://dev.to', '_blank');
    }
    this.searchForm.reset();
  }
}
