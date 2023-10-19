import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockComponent } from 'ng-mocks';
import { WeatherService } from './weather/weather.service';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    //imports: [RouterTestingModule, HttpClientTestingModule],
    imports: [HttpClientTestingModule, MockComponent(CurrentWeatherComponent)],
    
    //providers: [WeatherService],
    
    //declarations: [AppComponent, CurrentWeatherComponent]
    declarations: [AppComponent]
  }).compileComponents());

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /*
  it(`should have as title 'local-weather-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('local-weather-app');
  });
  */

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //expect(compiled.querySelector('h1')?.textContent).toContain('LocalCast Weather');
    expect(compiled.querySelector('span')?.textContent).toContain('LocalCast Weather');
  });
});
