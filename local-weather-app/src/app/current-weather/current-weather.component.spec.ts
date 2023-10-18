import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherService } from '../weather/weather.service';
import { WeatherServiceFake, fakeWeather } from '../weather/weather.service.fake';
import { injectSpy } from 'angular-unit-test-helper';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(
    async(() => {
      const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getCurrentWeather']);

      TestBed.configureTestingModule({
        declarations: [CurrentWeatherComponent],
        //providers: [WeatherService],
        /*
        providers: [
          { provide: WeatherService, useClass: WeatherServiceFake }
        ],
        */
        providers: [
          { provide: WeatherService, useValue: weatherServiceSpy }
        ]
        //imports: [HttpClientTestingModule]
      }).compileComponents();
      weatherServiceMock = injectSpy(WeatherService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    // arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    //act
    fixture.detectChanges(); //triggers ngOnInit

    //assert
    expect(component).toBeTruthy();
  });

  it('should get currentWeather from weatherService', () => {
    // arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    //act
    fixture.detectChanges(); //triggers ngOnInit

    //assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
  });

  it('should eagerly load currentWeather in Bathesda from weatherService', () => {
    // arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));

    //act
    fixture.detectChanges(); //triggers ngOnInit

    //assert
    expect(component.current).toBeDefined();
    expect(component.current.city).toEqual('Bethesda');
    expect(component.current.temperature).toEqual(280.32);

    //assert on DOM
    const debugEl = fixture.debugElement;
    const titleEl: HTMLElement = debugEl
      .query(By.css('span'))
      .nativeElement;
    expect(titleEl.textContent).toContain('Bethesda');
    
  });

  
});
