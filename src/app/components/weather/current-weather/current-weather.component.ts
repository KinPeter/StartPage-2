import { Component, OnInit, Input } from '@angular/core';
import { CurrentWeather } from 'src/app/interfaces/weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  @Input() weather: CurrentWeather;
  public isHighTemp = false;
  public isLowTemp = false;

  constructor() {}

  ngOnInit() {
    if (this.weather) {
      this.isHighTemp = this.weather.temperature > 26;
      this.isLowTemp = this.weather.temperature < 8;
    }
  }

  getWindScale(wSpeed: number): string {
    let wScale = 'No wind';
    if (wSpeed > 1 && wSpeed <= 4) {
      wScale = 'Light breeze';
    } else if (wSpeed > 4 && wSpeed <= 9) {
      wScale = 'Light wind';
    } else if (wSpeed > 9 && wSpeed <= 13) {
      wScale = 'Moderate wind';
    } else if (wSpeed > 13 && wSpeed <= 19) {
      wScale = 'Strong wind';
    } else if (wSpeed > 19 && wSpeed <= 24) {
      wScale = 'Stormy wind';
    } else if (wSpeed > 24) {
      wScale = 'Crazy wind';
    }
    return wScale;
  }
}
