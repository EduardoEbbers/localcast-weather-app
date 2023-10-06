import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;

  /*
  constructor() {
    this.current = {
      city: 'Bathesda',
      country: 'US',
      date: new Date(),
      image: 'assets/img/sunny.svg',
      temperature: 72,
      description: 'sunny'
    } as ICurrentWeather;
  }
  */
  constructor(private weatherService: WeatherService) {
    // property initialization

    this.current = {
      city: '--',
      country: '--',
      date: 0,
      image: '',
      temperature: 0,
      description: '--',
    }
    
  }

  ngOnInit() {
    this.weatherService
      .getCurrentWeather('London', 'Uk')
      .subscribe(data => this.current = data);
  }
}
