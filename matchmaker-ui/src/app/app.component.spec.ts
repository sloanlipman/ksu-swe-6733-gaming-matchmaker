import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from './app-material.module';
import { HttpService } from './shared/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockUsers } from './shared/mocks/mock-users';
import { User } from './shared/models/user';
import { HttpServiceMock, MatchmakingServiceMock } from './shared/mocks/mocks';
import { MatchmakingService } from './shared/services/matchmaking-service/matchmaking.service';

let fixture;
let component;
let mockUsers;
let user1;
let navigateSpy;
let httpService;
let matchmakingService;

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule, AppMaterialModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [
        { provide: HttpService, useClass: HttpServiceMock },
        { provide: MatchmakingService, useClass: MatchmakingServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    httpService = TestBed.get(HttpService);
    matchmakingService = TestBed.get(MatchmakingService);
    mockUsers = new MockUsers();
    user1 = new User(mockUsers.getUser1());

    navigateSpy = spyOn(component['router'], 'navigateByUrl').and.stub();
  });

  it('Should load all of the lists before routing to the edit profile page', fakeAsync(() => {
    spyOn(component, 'getAllInterests').and.returnValue(Promise.resolve());
    spyOn(component, 'getAllTimes').and.returnValue(Promise.resolve());
    spyOn(component, 'getAllPriorities').and.returnValue(Promise.resolve());
    spyOn(component, 'getAllGenres').and.returnValue(Promise.resolve());

    component.editProfile();
    tick();

    expect(component.getAllInterests).toHaveBeenCalled();
    expect(component.getAllTimes).toHaveBeenCalled();
    expect(component.getAllPriorities).toHaveBeenCalled();
    expect(component.getAllGenres).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith('/edit-profile');
  }));

  describe('getting lists', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    afterEach(() => {
      localStorage.clear();
    });

    it('should get all interests', fakeAsync(() => {
      const interests = ['Hiking', 'Fishing'];
      spyOn(component['httpService'], 'getAllInterests').and.returnValue(of(interests));
      component.getAllInterests();
      tick();
      expect(matchmakingService.interests).toEqual(interests);
    }));

    it('should get all genres', fakeAsync(() => {
      const genres = ['RPGs', 'FPS', 'RTS'];
      spyOn(component['httpService'], 'getAllGenres').and.returnValue(of(genres));
      component.getAllGenres();
      tick();
      expect(matchmakingService.genres).toEqual(genres);
    }));

    it('should get all times', fakeAsync(() => {
      const times = ['Afternoon', 'Morning', 'Evening', 'Late Night'];
      spyOn(component['httpService'], 'getAllTimes').and.returnValue(of(times));
      component.getAllTimes();
      tick();
      expect(matchmakingService.times).toEqual(times);
    }));

    it('should get all priorities', fakeAsync(() => {
      const priorities = ['Location', 'Interests', 'Active Time', 'Genres'];
      spyOn(component['httpService'], 'getAllPriorities').and.returnValue(of(priorities));
      component.getAllPriorities();
      tick();
      expect(matchmakingService.priorities).toEqual(priorities);
    }));

    it('should get all matches', fakeAsync(() => {
      matchmakingService.currentUser = user1;
      matchmakingService.matches = [];
      const matches = [user1, user1, user1];
      spyOn(component['matchmakingService'], 'getMatches').and.returnValue(of(matches));

      component.getMatches();

      tick();

      expect(matchmakingService.matches).toEqual(matches);
    }));

    it('should already have matches', fakeAsync(() => {
      spyOn(component['matchmakingService'], 'getMatches').and.returnValue(of());

      matchmakingService.matches = [user1];
      component.getMatches();

      tick();

      expect(matchmakingService.getMatches).not.toHaveBeenCalled();
      expect(matchmakingService.matches).toEqual([user1]);
    }));
  });
});
