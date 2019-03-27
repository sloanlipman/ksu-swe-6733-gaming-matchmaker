import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from './app-material.module';

let fixture;
let component;
let aboutSpy;
let contactSpy;

describe('AppComponent', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppMaterialModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  it('should open about page and contact page', () => {
    aboutSpy = spyOn<any>(component, 'showAbout').and.callThrough();
    contactSpy = spyOn<any>(component, 'showContact').and.callThrough();
    const about = fixture.nativeElement.querySelector('button#aboutButton');
    const contact = fixture.nativeElement.querySelector('button#contactButton');
    about.click();
    contact.click();
    expect(aboutSpy).toHaveBeenCalled();
    expect(contactSpy).toHaveBeenCalled();
  });

  it('should go to login page', () => {
    spyOn(component.router, 'navigateByUrl').and.callThrough();
    component.goToLoginPage();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should go to register page', () => {
    spyOn(component.router, 'navigateByUrl').and.callThrough();
    component.register();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/register');
  });

  it('should go to landing page', () => {
    spyOn(component.router, 'navigateByUrl').and.callThrough();
    component.goToLanding();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/landing-page');
  });

  it('should go to view profile page', () => {
    spyOn(component.router, 'navigateByUrl').and.callThrough();
    component.viewProfile(123);
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/view-profile/123');
  });

  it('should go a location', () => {
    spyOn(component.location, 'back').and.callThrough();
    component.goBack();
    expect(component.location.back).toHaveBeenCalled();
  });

  it('should go to home page', () => {
    spyOn(component.router, 'navigateByUrl').and.callThrough();
    component.goHome();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should go to edit profile page', () => {
    spyOn(component.router, 'navigateByUrl').and.callThrough();
    component.editProfile();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/edit-profile');
  });

  it('should go to matchmaking page', () => {
    spyOn(component.router, 'navigateByUrl').and.callThrough();
    component.viewMatchmaking();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/matchmaking');
  });

  it('should open a dialog', () => {
    spyOn(component.dialog, 'open');
    component.showLoading();
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should not show home button on toolbar for any page except landing, login, and register', () => {
    expect(component.showHome('/landing-page')).toBe(false);
    expect(component.showHome('/login')).toBe(false);
    expect(component.showHome('/register')).toBe(false);
    expect(component.showHome('/home')).toBe(true);
    expect(component.showHome('/edit-profile')).toBe(true);
    expect(component.showHome('/view-profile')).toBe(true);
    expect(component.showHome('/matchmake')).toBe(true);
    });
});

