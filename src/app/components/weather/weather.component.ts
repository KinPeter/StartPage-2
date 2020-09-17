import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from 'src/app/interfaces/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public weather: Weather;
  public city: string;
  public today: Date;
  public lastUpdated: string;

  constructor(public weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.weather.subscribe((value: Weather) => {
      this.weather = value;
    });
    this.weatherService.city.subscribe((value: string) => {
      this.city = value;
    });
    this.today = new Date();
  }

  getLastUpdated(): void {
    if (this.weather) {
      const now = new Date().getTime();
      const last = this.weather.lastUpdated.getTime();
      const diff = Math.floor((now - last) / 1000 / 60);
      this.lastUpdated = diff <= 1 ? 'Updated just now' : `Updated ${diff} minutes ago`;
    } else {
      this.lastUpdated = '';
    }
  }
}
