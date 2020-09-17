export type LocationParams = {
  key: string;
  lat: string;
  lon: string;
  format: string;
};

export type WeatherParams = {
  exclude: string;
  units: string;
};

export interface Weather {
  currentWeather: CurrentWeather;
  dailyWeather: DailyWeather[];
  lastUpdated: Date;
}

export interface CurrentWeather {
  summary: string; // currently.summary
  icon: string; // currently.icon
  precip: number; // currently.precipProbability
  temperature: number; // currently.temperature
  temperatureLow: number; // daily.data[0].temperatureLow
  temperatureHigh: number; // daily.data[0].temperatureHigh
  windSpeed: number; // currently.windSpeed
  forecast: string; // hourly.summary
}

export interface DailyWeather {
  time: Date; // daily.data[i].time
  icon: string; // daily.data[i].icon
  temperatureLow: number; // daily.data[i].temperatureLow
  temperatureHigh: number; // daily.data[i].temperatureHigh
  precip: number; // daily.data[i].precipProbability
}
