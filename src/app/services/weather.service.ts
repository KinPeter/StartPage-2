import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { locationIqApiKey, darkSkyApiKey } from '../../../keys';
import { LocationParams, WeatherParams, Weather, DailyWeather } from '../interfaces/weather';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';
import { BehaviorSubject } from 'rxjs';

interface LocationResponse {
  address: {
    city: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private locationIqUrl = 'https://eu1.locationiq.com/v1/reverse.php';
  private darkSkyUrl = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast';
  public city: BehaviorSubject<string>;
  public weather: BehaviorSubject<Weather>;
  private timer = 0;

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private spinner: SpinnerService
  ) {
    this.city = new BehaviorSubject('');
    this.weather = new BehaviorSubject(null);
    this.fetchLocationAndWeatherData();
  }

  async fetchLocationAndWeatherData(): Promise<void> {
    this.spinner.show();
    try {
      const coords: Coordinates = await this.getLocation();
      const locResponse = await this.getCity(coords);
      this.city.next(locResponse.address.city);
      await this.getWeather(coords);
      this.setFetchWeatherTimer(coords);
    } catch (error) {
      this.alert.show('Error fetching location or weather. ' + error.message, 'danger');
      console.log('getWeather() Error: ', error.message);
    } finally {
      this.spinner.hide();
    }
  }

  private getLocation(): Promise<Coordinates> {
    const options: PositionOptions = {
      timeout: 3000,
      maximumAge: 1000 * 60 * 60 * 3, // 3 hours for cached result
    };
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos: Position) => {
          const coords: Coordinates = pos.coords;
          resolve(coords);
        },
        (err: PositionError) => {
          const errorMessage: string = WeatherService.getLocationErrorMessage(err);
          reject(new Error(errorMessage));
        },
        options
      );
    });
  }

  private static getLocationErrorMessage(err: PositionError): string {
    switch (err.code) {
      case 1:
        return '[Location] Permission denied.';
      case 2:
        return '[Location] Location unavailable.';
      case 3:
        return '[Location] Request timeout.';
    }
  }

  private getCity(coords: Coordinates): Promise<LocationResponse> {
    const locationParams: LocationParams = {
      key: locationIqApiKey,
      lat: coords.latitude.toString(),
      lon: coords.longitude.toString(),
      format: 'json',
    };
    return this.http
      .get<LocationResponse>(this.locationIqUrl, { params: locationParams })
      .toPromise();
  }

  private async getWeather(coords: Coordinates): Promise<void> {
    const lat = coords.latitude.toString();
    const lon = coords.longitude.toString();
    const URL = `${this.darkSkyUrl}/${darkSkyApiKey}/${lat},${lon}`;
    const weatherParams: WeatherParams = {
      exclude: 'minutely,alerts,flags',
      units: 'si',
    };
    const weatherResponse = await this.http.get(URL, { params: weatherParams }).toPromise();
    const newWeather = this.transformWeather(weatherResponse);
    this.weather.next(newWeather);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transformWeather(response: any): Weather {
    const weather: Weather = {
      currentWeather: {
        summary: response.currently.summary,
        icon: response.currently.icon,
        precip: response.daily.data[0].precipProbability,
        temperature: response.currently.temperature,
        temperatureLow: response.daily.data[0].temperatureLow,
        temperatureHigh: response.daily.data[0].temperatureHigh,
        windSpeed: response.currently.windSpeed,
        forecast: response.hourly.summary,
      },
      dailyWeather: [],
      lastUpdated: new Date(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.daily.data.forEach((data: any, i: number) => {
      if (i > 0 && i < 6) {
        const daily: DailyWeather = {
          time: new Date(data.time * 1000),
          icon: data.icon,
          temperatureLow: data.temperatureLow,
          temperatureHigh: data.temperatureHigh,
          precip: data.precipProbability,
        };
        weather.dailyWeather.push(daily);
      }
    });
    return weather;
  }

  private setFetchWeatherTimer(coords: Coordinates): void {
    if (this.timer !== 0) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(async () => {
      try {
        await this.getWeather(coords);
      } catch (e) {
        console.error('WeatherService.timer: Could not update weather');
      }
    }, 1000 * 60 * 60);
  }
}
