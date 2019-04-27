import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { LoadingIndicator } from 'src/app/shared/components/loading-indicator/loading-indicator.component';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { LoginService } from 'src/app/shared/services/login-service/login.service';
import { MockUsers } from 'src/app/shared/mocks/mock-users';
import { User } from 'src/app/shared/models/user';


describe('LoginPage', () => {
  let mockUsers;
  let user1;
  let user2;
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let goHomeSpy;
  let editProfileSpy;
  let closeDialogSpy;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      declarations: [
        LoginPage,
        LoadingIndicator
      ],
      providers: [
        FormBuilder,
        HttpService,
        LoginService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  afterEach(() => {
    component['httpService'].snackBar.dismiss();
  });

  beforeEach(() => {
    mockUsers = new MockUsers();
    user1 = new User(mockUsers.getUser1());
    user2 = mockUsers.getUser2();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    spyOn<any>(component, 'showLoading').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    beforeEach(() => {
      goHomeSpy = spyOn(component, 'goHome').and.stub();
      editProfileSpy = spyOn(component, 'editProfile').and.stub();
      closeDialogSpy = spyOn<any>(component, 'closeDialog').and.stub();
    });

    it('should not call any methods if the form fails validation', () => {
      spyOnProperty(component.userLoginForm, 'invalid').and.returnValue(true);
      spyOn(component['loginService'], 'handleError').and.callThrough();
      component.onSubmit();
      expect(goHomeSpy).not.toHaveBeenCalled();
      expect(component['closeDialog']).not.toHaveBeenCalled();
      expect(component['loginService'].handleError).toHaveBeenCalled();
    });

    it('should call goHome() on server response for a user who has completed the profile', () => {
      component.allPriorities = ['Active Times', 'Game Genres', 'Location', 'Interests'];
      spyOnProperty(component.userLoginForm, 'invalid').and.returnValue(false);
      spyOn(component['loginService'], 'login').and.returnValue(of(user1));
      console.log('USER 1 IS', user1);
      component.onSubmit();
      expect(goHomeSpy).toHaveBeenCalled();
    });

    it('should call editProfile() on server response for a user with incomplete profile', () => {
      spyOnProperty(component.userLoginForm, 'invalid').and.returnValue(false);
      spyOn(component['loginService'], 'login').and.returnValue(of(user2));
      component.onSubmit();
      expect(editProfileSpy).toHaveBeenCalled();
    });

    it('should dismiss loading indicator on no server response', () => {
      spyOnProperty(component.userLoginForm, 'invalid').and.returnValue(false);
      spyOn(component['loginService'], 'login').and.returnValue(of(false));
      component.onSubmit();
      expect(component['closeDialog']).toHaveBeenCalled();
    });
  });
});
