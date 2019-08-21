import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { locationIqApiKey, darkSkyApiKey } from '../../../keys';
import { LocationParams } from '../interfaces/weather';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    private locationIqUrl = 'https://eu1.locationiq.com/v1/reverse.php';
    private darkSkyUrl = '';

    constructor(
        private http: HttpClient,
    ) { }

    async getLocationAndCity(): Promise<void> {
        try {
            const coords: Coordinates = await this.getLocation();
            const locResponse = await this.getCity(coords);
            console.log(locResponse.address.city);
        } catch (error) {
            console.log(error);
        } finally {
            //
        }
    }

    private getLocation(): Promise<Coordinates> {
        const options: PositionOptions = {
            timeout: 3000,
            maximumAge: 1000 * 60 * 60 * 3  // 3 hours for cached result
        };
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (pos: Position) => {
                    const coords: Coordinates = pos.coords;
                    resolve(coords);
                },
                (err: PositionError) => {
                    const errorMessage: string = this.getLocationErrorMessage(err);
                    reject(errorMessage);
                },
                options
            );
        });
    }

    private getLocationErrorMessage(err: PositionError): string {
        switch (err.code) {
            case 1:
                return 'Permission denied.';
            case 2:
                return 'Location unavailable.';
            case 3:
                return 'Request timeout.';
        }
    }

    private getCity(coords: Coordinates): Promise<any> {
        const locationParams: LocationParams = {
            key: locationIqApiKey,
            lat: coords.latitude.toString(),
            lon: coords.longitude.toString(),
            format: 'json'
        };
        return this.http.get(this.locationIqUrl, { params: locationParams }).toPromise();
    }
}
