import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  //current: ICurrentWeather;
  current$: Observable<ICurrentWeather>;
  private subscriptions = new SubSink();

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
    /*
    this.current = {
      city: '--',
      country: '--',
      date: 0,
      image: '',
      temperature: 0,
      description: '--',
    }
    */
    this.current$ = weatherService.currrentWeather$;
    
  }

  ngOnInit() {
    /*
    this.weatherService
      .getCurrentWeather('London', 'Uk')
      .subscribe(data => this.current = data);
    */
   /*
   this.weatherService.currrentWeather$
    .subscribe(data => this.current = data);
  */
  /*
    this.subscriptions.add(
      this.weatherService.currrentWeather$
        .subscribe(data => this.current = data)
    );
  */
  }
  
  ngOnDestroy(): void {
    //this.subscriptions.unsubscribe();
  }

  getOrdinal(date: number) {
    const n = new Date(date).getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : ''
  }
}
