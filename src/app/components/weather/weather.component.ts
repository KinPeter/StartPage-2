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
    public isHighTemp = false;
    public isLowTemp = false;

    constructor(
        public weatherService: WeatherService
    ) { }

    ngOnInit() {
        this.weatherService.weather.subscribe((value: Weather) => {
            this.weather = value;
            if (value) {
                this.isHighTemp = value.currentWeather.temperature > 28;
                this.isLowTemp = value.currentWeather.temperature < 8;
            }
        });
        this.weatherService.city.subscribe((value: string) => {
            this.city = value;
        });
        this.today = new Date();
    }

    getWindScale(wSpeed: number): string {
        let wScale = '';
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
