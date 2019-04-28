import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
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

let fixture;
let component;
let urlSpy;
let dialogSpy;
let routerSpy;
let mockUsers;
let user1;
let showLoadingSpy;

describe('AppComponent', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        AppMaterialModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        HttpService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    mockUsers = new MockUsers();
    user1 = new User(mockUsers.getUser1());
    showLoadingSpy = spyOn(component, 'showLoading').and.stub();
  });

  afterEach(() => {
    fixture.destroy();
    component.dialog.closeAll();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should open about page', () => {
    dialogSpy = spyOn(component.dialog, 'open');
    component.showAbout();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should open contact page', () => {
    dialogSpy = spyOn(component.dialog, 'open');
    component.showContact();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should go back a location', () => {
    spyOn(component.location, 'back').and.callThrough();
    component.goBack(); // TODO this case is kind of trivial because we're expecting something that is directly called
    expect(component.location.back).toHaveBeenCalled();
  });

  describe('Navigation', () => {
    beforeEach(() => {
      component.isLoading = true;
      routerSpy = spyOn(component.router, 'navigateByUrl').and.returnValue(Promise.resolve(of()));
      fixture.detectChanges();
    });

    it('should go to login page', () => {
      component.goToLoginPage();
      expect(routerSpy).toHaveBeenCalledWith('/login');
    });

    it('should go to register page', () => {
      component.register();
      expect(routerSpy).toHaveBeenCalledWith('/register');
    });

    it('should go to landing page', () => {
      component.goToLanding();
      expect(routerSpy).toHaveBeenCalledWith('/landing-page');
    });

    it('should go to view profile page', () => {

      component.viewProfile(user1);
      expect(routerSpy).toHaveBeenCalledWith('/view-profile/127');
    });


    it('should go to home page', () => {
      component.goHome();
      expect(routerSpy).toHaveBeenCalledWith('/home');
    });

    it('should go to the edit profile page without populating the lists', () => {
      component.allGenres = ['RPG'];
      component.allInterests = ['Swimming'];
      component.allPriorities = ['1'];
      component.allTimes = ['Evening'];
      component.editProfile();
      expect(routerSpy).toHaveBeenCalledWith('/edit-profile');
    });

    it('should go to edit profile page after resolving promises', fakeAsync(() => {
      component.isLoading = false;
      showLoadingSpy.and.stub();
      spyOn(component, 'getAllInterests').and.returnValue(Promise.resolve(of()));
      spyOn(component, 'getAllTimes').and.returnValue(Promise.resolve(of()));
      spyOn(component, 'getAllPriorities').and.returnValue(Promise.resolve(of()));
      spyOn(component, 'getAllGenres').and.returnValue(Promise.resolve(of()));
      component.allGenres = null;

      component.editProfile();
      tick(0);
      expect(routerSpy).toHaveBeenCalledWith('/edit-profile');
      expect(showLoadingSpy).toHaveBeenCalled();
    }));

    it('should go to matchmaking page', fakeAsync(() => {
      spyOn(component, 'getMatches').and.returnValue(Promise.resolve(of()));
      component.viewMatchmaking();
      tick(0);
      expect(routerSpy).toHaveBeenCalledWith('/matchmaking');
    }));
  });

  it('should open a dialog', () => {
    spyOn(component.dialog, 'open');
    showLoadingSpy.and.callThrough();
    component.showLoading();
    expect(component.dialog.open).toHaveBeenCalled();
  });

  describe('home button on toolbar', () => {
    it('should set the current url when checking for home button', () => {
     urlSpy = spyOn(component, 'setUrl').and.callThrough();
      component.showHome();
      expect(urlSpy).toHaveBeenCalled();
    });

    it('should not show for landing page', () => {
      urlSpy = spyOn(component, 'setUrl').and.callFake(() => {
        component.url = '/landing-page';
      });
      expect(component.showHome()).toEqual(false);
    });

    it('should not show for login', () => {
      urlSpy = spyOn(component, 'setUrl').and.callFake(() => {
        component.url = '/login';
      });
      expect(component.showHome()).toEqual(false);
    });

    it('should not show for register', () => {
      urlSpy = spyOn(component, 'setUrl').and.callFake(() => {
        component.url = '/register';
      });
      expect(component.showHome()).toEqual(false);
    });

    it('should show for anything else', () => {
      urlSpy = spyOn(component, 'setUrl').and.callFake(() => {
        component.url = 'any-other-url';
      });
        expect(component.showHome()).toEqual(true);
    });
  });

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
      tick(0);
      const allInterests = JSON.parse(localStorage.getItem('interests'));
      expect(allInterests).toEqual(interests);
    }));

    it('should get all genres', fakeAsync(() => {
      const genres = ['RPGs', 'FPS', 'RTS'];
      spyOn(component['httpService'], 'getAllGenres').and.returnValue(of(genres));
      component.getAllGenres();
      tick(0);
      const allGenres = JSON.parse(localStorage.getItem('genres'));
      expect(allGenres).toEqual(genres);
    }));

    it('should get all times', fakeAsync(() => {
      const times = ['Afternoon', 'Morning', 'Evening', 'Late Night'];
      spyOn(component['httpService'], 'getAllTimes').and.returnValue(of(times));
      component.getAllTimes();
      tick(0);
      const allTimes = JSON.parse(localStorage.getItem('times'));
      expect(allTimes).toEqual(times);
    }));

    it('should get all priorities', fakeAsync(() => {
      const priorities = ['Location', 'Interests', 'Active Time', 'Genres'];
      spyOn(component['httpService'], 'getAllPriorities').and.returnValue(of(priorities));
      component.getAllPriorities();
      tick(0);
      const allPriorities = JSON.parse(localStorage.getItem('priorities'));
      expect(allPriorities).toEqual(priorities);
    }));

    it('should get all matches', fakeAsync(() => {
      component.matches = null;
      const matches = [user1, user1, user1]; // fake data, just want an array of users, don't care about actual contents for this test
      spyOn(component['matchmakingService'], 'getMatches').and.returnValue(of(matches));
      localStorage.setItem('user', JSON.stringify(user1));
      component.getMatches();
      tick(0);
      expect(component.matches).toEqual(matches);
      component.getMatches();
      tick(0);
      expect(component.matches).toEqual(matches);
    }));
    it('should already have matches', fakeAsync(() => {
      component.matches = [user1];
      component.getMatches();
      tick(0);
      expect(component.matches).toEqual([user1]);
    }));

    it('should get user', () => {
      localStorage.setItem('user', JSON.stringify(user1));
      spyOn(component['httpService'], 'getUser').and.returnValue(of(user1));
      component.getUser();
      expect(component.currentUser).toEqual(user1);
    });
  });
});

