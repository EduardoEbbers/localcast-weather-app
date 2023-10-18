import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherService } from '../weather/weather.service';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      providers: [WeatherService],
      imports: [HttpClientTestingModule]
    });
    
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
