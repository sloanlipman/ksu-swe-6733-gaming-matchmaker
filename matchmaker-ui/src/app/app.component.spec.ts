import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from './app-material.module';
import { HttpService } from './shared/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let fixture;
let component;
let urlSpy;
let dialogSpy;
let routerSpy;

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
      component.viewProfile(123);
      expect(routerSpy).toHaveBeenCalledWith('/view-profile/123');
    });


    it('should go to home page', () => {
      component.goHome();
      expect(routerSpy).toHaveBeenCalledWith('/home');
    });

    it('should go to edit profile page', () => {
      spyOn(component, 'getAllInterests').and.returnValue(Promise.resolve());
      spyOn(component, 'getAllTimes').and.returnValue(Promise.resolve());
      spyOn(component, 'getAllPriorities').and.returnValue(Promise.resolve());
      spyOn(component, 'getAllGenres').and.returnValue(Promise.resolve());

      component.editProfile();
      expect(routerSpy).toHaveBeenCalledWith('/edit-profile');
    });

    it('should go to matchmaking page', () => {
      component.viewMatchmaking();
      expect(routerSpy).toHaveBeenCalledWith('/matchmaking');
    });
  });

  it('should open a dialog', () => {
    spyOn(component.dialog, 'open');
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
      expect(component.showHome()).toBe(false);
    });

    it('should not show for login', () => {
      urlSpy = spyOn(component, 'setUrl').and.callFake(() => {
        component.url = '/login';
      });
      expect(component.showHome()).toBe(false);
    });

    it('should not show for register', () => {
      urlSpy = spyOn(component, 'setUrl').and.callFake(() => {
        component.url = '/register';
      });
      expect(component.showHome()).toBe(false);
    });

    it('should show for anything else', () => {
      urlSpy = spyOn(component, 'setUrl').and.callFake(() => {
        component.url = 'any-other-url';
      });
        expect(component.showHome()).toBe(true);
    });
  });
});

