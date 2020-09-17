import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ResultData } from 'src/app/interfaces/dictionary';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-dict',
  templateUrl: './dict.component.html',
  styleUrls: ['./dict.component.scss'],
})
export class DictComponent implements OnInit {
  input = new FormControl();
  wordlist: string[] = [];
  filteredWords: Observable<string[]>;
  results: ResultData[] = [];
  closingResults = false;

  constructor(private dict: DictionaryService, private alert: AlertService) {}

  ngOnInit() {
    this.dict.wordList.subscribe((value: string[]) => {
      this.wordlist = value;
    });
    this.filteredWords = this.input.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
      debounceTime(500)
    );
  }

  onSubmit(): void {
    const newResults = this.dict.wordLookup(this.input.value);
    if (newResults.length > 50) {
      this.alert.show('Too many results, please narrow your search.', 'danger');
      return;
    } else if (newResults.length === 0) {
      this.alert.show('Sorry, no match found.', 'danger');
      return;
    }
    this.results = newResults;
    this.input.setValue('');
  }

  onCloseResults(): void {
    this.closingResults = true;
    setTimeout(() => {
      this.results = [];
      this.closingResults = false;
    }, 300);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.wordlist.filter(word => this._normalizeValue(word).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
