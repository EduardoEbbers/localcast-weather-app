import { Component } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-city-search-tpldriven',
  templateUrl: './city-search-tpldriven.component.html',
  styleUrls: ['./city-search-tpldriven.component.css']
})
export class CitySearchTpldrivenComponent {
  model = {
    search: ''
  };

  constructor(private weatherService: WeatherService) { }

  doSearch(searchValue: any) {
    const userInput = searchValue
      .split(',')
      .map((s: any) => s.trim())

    this.weatherService
      .getCurrentWeather(
        userInput[0],
        userInput.length > 1 ? userInput[1] : undefined  
      ).subscribe(data => console.log(data));
  }
}
