import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { ICurrentWeather } from '../interfaces';

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}

export interface IWeatherService {
  getCurrentWeather(search: string | number, country?: string): Observable<ICurrentWeather>;
  getCurrentWeatherByCoords(coords: GeolocationCoordinates): Observable<ICurrentWeather>;
}

export const defaultWeather: ICurrentWeather = {
  city: '--',
  country: '--',
  date: Date.now(),
  image: '',
  temperature: 0,
  description: ''
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(search: string | number, country?: string): Observable<ICurrentWeather> {
    let uriParams = new HttpParams();

    if(typeof search === 'string') {
      uriParams = uriParams
        .set('q', country ? `${search},${country}` : search);
    } else {
      uriParams = uriParams
        .set('zip', search);
    }
    /*
      uriParams = uriParams
        .set('appid', environment.appid);
    */
    /*
    return this.httpClient
      .get<ICurrentWeatherData>(`${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` + `q=${city},${country}&appid=${environment.appid}`);
    */
    /*
      return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`, 
        { params: uriParams }
      ).pipe(map(data => this.transformToICurrentWeather(data)));
      */

    return this.getCurrentWeatherHelper(uriParams);
  }

  getCurrentWeatherByCoords(coords: GeolocationCoordinates): Observable<ICurrentWeather> {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString());

    return this.getCurrentWeatherHelper(uriParams);
  }

  transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    }
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return kelvin * 9 / 5 - 459.67;
  }

  private getCurrentWeatherHelper(uriParams: HttpParams): Observable<ICurrentWeather> {
    uriParams = uriParams
        .set('appid', environment.appid);

    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`, 
        { params: uriParams }
      ).pipe(map(data => this.transformToICurrentWeather(data)));    
  }
}
