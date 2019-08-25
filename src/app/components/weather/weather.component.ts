import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Weather } from 'src/app/interfaces/weather';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

    public weather: Weather;
    public city: string;
    public today: Date;

    constructor(
        public weatherService: WeatherService
    ) { }

    ngOnInit() {
        this.weatherService.weather.subscribe((value: Weather) => {
            this.weather = value;
        });
        this.weatherService.city.subscribe((value: string) => {
            this.city = value;
        });
        this.today = new Date();
    }

}
