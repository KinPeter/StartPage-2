import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import * as dayjs from 'dayjs';

import { ResultData, PreResults } from '../interfaces/dictionary';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';
import { dictUrl } from '../../../keys';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  public dictionary = {
    kor: [],
    hun: [],
  };
  public wordList: Subject<string[]> = new BehaviorSubject<string[]>([]);
  public randomWord: Subject<ResultData> = new Subject<ResultData>();

  get isFetchExpired(): boolean {
    const lastFetchStored = localStorage.getItem('start-korean-last-fetch');
    if (!lastFetchStored) return true;
    const lastFetch = dayjs(lastFetchStored);
    const now = dayjs();
    return now.diff(lastFetch, 'day') >= 7;
  }

  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private alert: AlertService
  ) {
    this.getWordList();
  }

  async fetchWordsFromGSheet(): Promise<string> {
    this.spinner.show();
    try {
      return await this.http.get(dictUrl, { responseType: 'text' }).toPromise();
    } catch (error) {
      console.log(error);
      this.alert.show('Fetching of dictionary failed.', 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  private async getWordList(forced = false): Promise<void> {
    const saved = localStorage.getItem('start-korean');
    if (!saved || forced || this.isFetchExpired) {
      const result = await this.fetchWordsFromGSheet();
      this.createDictionaries(result);
      localStorage.setItem('start-korean', result);
      localStorage.setItem('start-korean-last-fetch', new Date().toISOString());
    } else {
      this.createDictionaries(saved);
    }
    this.getRandomWord();
  }

  private createDictionaries(result: string): void {
    const lines = result.split(/\r\n/);
    lines.forEach((line: string) => {
      const pair = line.split(/\t/);
      this.dictionary.kor.push(pair[0]);
      this.dictionary.hun.push(pair[1]);
    });
    this.wordList.next([...this.dictionary.hun, ...this.dictionary.kor]);
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
    requestAnimationFrame(() => {
      this.randomWord.next({
        word: this.dictionary.kor[rnd],
        translate: this.dictionary.hun[rnd],
      });
    });
  }
}
