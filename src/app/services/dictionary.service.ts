import { Injectable } from '@angular/core';
import { ResultData, PreResults } from '../interfaces/dictionary';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  // tslint:disable-next-line: max-line-length
  private dictUrl =
    'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vST-KJ2L6WJJLRw9phcMslOIumSFrjPXY9UUnzw3X9Urq1vwRrDoVhlTiGwuPSda8XRJPolPR65XBD7/pub?gid=0&single=true&output=tsv';
  public dictionary = {
    kor: [],
    hun: [],
  };
  public wordList: Subject<string[]> = new BehaviorSubject<string[]>([]);
  public randomWord: Subject<ResultData> = new Subject<ResultData>();

  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private alert: AlertService
  ) {
    this.fetchWordsFromGSheet();
  }

  async fetchWordsFromGSheet(): Promise<any> {
    this.spinner.show();
    try {
      const result: any = await this.http.get(this.dictUrl, { responseType: 'text' }).toPromise();
      const lines = result.split(/\r\n/);
      lines.forEach((line: string) => {
        const pair = line.split(/\t/);
        this.dictionary.kor.push(pair[0]);
        this.dictionary.hun.push(pair[1]);
      });
      this.wordList.next([...this.dictionary.hun, ...this.dictionary.kor]);
      this.getRandomWord();
    } catch (error) {
      console.log(error);
      this.alert.show('Fetching of dictionary failed.', 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  wordLookup(word: string): ResultData[] {
    const hun = this.dictionary.hun;
    const kor = this.dictionary.kor;
    word = word.trim().toLowerCase();
    // const regex = new RegExp('\\b' + word + '\\b') // does not work with korean :(
    const regexOnOwn = new RegExp("(?:^|\\s|-|'|~)" + word + "(?:$|\\s|,|-|'|~)");
    const regexInParentheses = new RegExp('(?:\\()' + word + '(?:\\))');

    const preResults: PreResults = {
      exact: [],
      onOwn: [],
      startsWith: [],
      inParentheses: [],
      partial: [],
    };

    for (let i = 0; i < hun.length; i++) {
      // check for exact match
      if (word === hun[i].toLowerCase()) {
        preResults.exact.push({ word: hun[i], translate: kor[i] });
      } else if (word === kor[i].toLowerCase()) {
        preResults.exact.push({ word: kor[i], translate: hun[i] });

        // check for word on it's own in the entry
      } else if (regexOnOwn.test(hun[i].toLowerCase())) {
        preResults.onOwn.push({ word: hun[i], translate: kor[i] });
      } else if (regexOnOwn.test(kor[i])) {
        preResults.onOwn.push({ word: kor[i], translate: hun[i] });

        // check for match starting with word
      } else if (hun[i].toLowerCase().startsWith(word)) {
        preResults.startsWith.push({ word: hun[i], translate: kor[i] });
      } else if (kor[i].toLowerCase().startsWith(word)) {
        preResults.startsWith.push({ word: kor[i], translate: hun[i] });

        // check for word on it's own but in parentheses
      } else if (regexInParentheses.test(hun[i].toLowerCase())) {
        preResults.inParentheses.push({ word: hun[i], translate: kor[i] });
      } else if (regexInParentheses.test(kor[i])) {
        preResults.inParentheses.push({ word: kor[i], translate: hun[i] });

        // check for match including word anywhere
      } else if (hun[i].toLowerCase().includes(word)) {
        preResults.partial.push({ word: hun[i], translate: kor[i] });
      } else if (kor[i].toLowerCase().includes(word)) {
        preResults.partial.push({ word: kor[i], translate: hun[i] });
      }
    }
    return this.combineResults(preResults);
  }
  combineResults(preResults: PreResults): ResultData[] {
    // finalize results array
    let results: ResultData[] = [];
    results = results.concat(
      preResults.exact,
      preResults.onOwn,
      preResults.startsWith,
      preResults.inParentheses,
      preResults.partial
    );
    return results;
  }

  getRandomWord(): void {
    const max = this.dictionary.hun.length;
    const rnd = Math.floor(Math.random() * max);
    this.randomWord.next({
      word: this.dictionary.kor[rnd],
      translate: this.dictionary.hun[rnd],
    });
  }
}
