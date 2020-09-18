import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';
import { birthdaysUrl } from '../../../keys';
import { BirthdayItem } from '../interfaces/birthdays';

@Injectable({
  providedIn: 'root',
})
export default class BirthdaysService {
  private birthdays: BirthdayItem[] | undefined;

  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private alert: AlertService
  ) {
    this.getBirthdays();
  }

  async fetchFromGSheet(): Promise<void> {
    this.spinner.show();
    try {
      const result = await this.http.get(birthdaysUrl, { responseType: 'text' }).toPromise();
      this.birthdays = this.convertTsvToBirthdays(result);
    } catch (error) {
      console.log(error);
      this.alert.show('Fetching of birthdays failed.', 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  private async getBirthdays(): Promise<void> {
    const saved = localStorage.getItem('start-bdays');
    if (!saved) {
      await this.fetchFromGSheet();
      localStorage.setItem('start-bdays', JSON.stringify(this.birthdays));
    }
  }

  private convertTsvToBirthdays(result: string): BirthdayItem[] {
    const lines = result.split(/\r\n/);
    return lines.map(line => {
      const entry = line.split(/\t/);
      const dateStr = entry[1].split('/');
      const month = dateStr[0];
      const day = dateStr[1];
      const now = new Date();
      return {
        name: entry[0],
        date: new Date(`${now.getFullYear()}-${month}-${day}`),
      };
    });
  }
}
