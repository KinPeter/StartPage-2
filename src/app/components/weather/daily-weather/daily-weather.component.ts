import { Component, OnInit, Input } from '@angular/core';
import { DailyWeather } from 'src/app/interfaces/weather';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.scss'],
})
export class DailyWeatherComponent implements OnInit {
  @Input() weather: DailyWeather;

  constructor() {}

  ngOnInit() {}
}
