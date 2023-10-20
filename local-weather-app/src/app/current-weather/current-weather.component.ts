import { Component, Input, OnInit } from '@angular/core';
import { ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  @Input()
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
    /*
    this.weatherService
      .getCurrentWeather('London', 'Uk')
      .subscribe(data => this.current = data);
      */
  }

  getOrdinal(date: number) {
    const n = new Date(date).getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : ''
  }
}
