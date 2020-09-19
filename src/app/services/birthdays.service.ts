import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as dayjs from 'dayjs';

import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';
import { birthdaysUrl } from '../../../keys';
import { BirthdayItem } from '../interfaces/birthdays';

@Injectable({
  providedIn: 'root',
})
export default class BirthdaysService {
  private birthdays: BirthdayItem[] | undefined;
  private _sameDay: BehaviorSubject<BirthdayItem[]> = new BehaviorSubject<BirthdayItem[]>([]);
  private _upcoming: BehaviorSubject<BirthdayItem[]> = new BehaviorSubject<BirthdayItem[]>([]);

  get sameDay(): Observable<BirthdayItem[]> {
    return this._sameDay.asObservable();
  }

  get upcoming(): Observable<BirthdayItem[]> {
    return this._upcoming.asObservable();
  }

  get isFetchExpired(): boolean {
    const lastFetchStored = localStorage.getItem('start-bdays-last-fetch');
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
    this.getBirthdays();
  }

  public refresh(): void {
    this.getBirthdays(true);
  }

  private async fetchFromGSheet(): Promise<string> {
    this.spinner.show();
    try {
      return await this.http.get(birthdaysUrl, { responseType: 'text' }).toPromise();
    } catch (error) {
      console.log(error);
      this.alert.show('Fetching of birthdays failed.', 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  private async getBirthdays(forced = false): Promise<void> {
    const saved = localStorage.getItem('start-bdays');
    if (!saved || forced || this.isFetchExpired) {
      const result = await this.fetchFromGSheet();
      this.birthdays = BirthdaysService.convertTsvToBirthdays(result);
      localStorage.setItem('start-bdays', JSON.stringify(this.birthdays));
      localStorage.setItem('start-bdays-last-fetch', new Date().toISOString());
    } else {
      this.birthdays = JSON.parse(saved);
    }
    this.filterBirthdays();
  }

  private filterBirthdays(): void {
    const sameDayBirthdays = [];
    let upcomingBirthdays = [];
    const nextYearBirthdays = [];
    const today = dayjs().hour(0).minute(0).second(0).millisecond(0);
    const isEndOfYear = today.month() === 11 && today.date() > 15;

    this.birthdays.forEach(bday => {
      let otherDay = dayjs(bday.date).year(dayjs().year());

      if (otherDay.isSame(today)) {
        sameDayBirthdays.push(bday);
        return;
      }

      if (isEndOfYear && otherDay.month() === 0) {
        otherDay = dayjs(bday.date).year(dayjs().year() + 1);
      }

      const diff = otherDay.diff(today, 'day');
      if (diff > 0 && diff <= 14) {
        if (isEndOfYear && otherDay.month() === 0) {
          nextYearBirthdays.push(bday);
        } else {
          upcomingBirthdays.push(bday);
        }
      }
    });

    if (isEndOfYear) {
      upcomingBirthdays = [...upcomingBirthdays, ...nextYearBirthdays];
    }

    this._sameDay.next(sameDayBirthdays);
    this._upcoming.next(upcomingBirthdays);
  }

  private static convertTsvToBirthdays(result: string): BirthdayItem[] {
    const lines = result.split(/\r\n/);
    return lines.map(line => {
      const entry = line.split(/\t/);
      return {
        name: entry[0],
        date: entry[1],
      };
    });
  }
}
