import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPage } from './register-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { RegisterService } from 'src/app/shared/services/register-service/register.service';
import { LoginService } from 'src/app/shared/services/login-service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { MockUsers } from 'src/app/shared/mocks/mock-users';


describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let registerSpy;
  let loginSpy;
  let editProfileSpy;
  let closeDialogSpy;
  let data;
  let user;
  let mockUsers;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        MatDialogModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      declarations: [ RegisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        RegisterService,
        LoginService,
        FormBuilder,
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component['httpService'].snackBar.dismiss();
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit registration', () => {
    beforeEach(() => {
      closeDialogSpy = spyOn<any>(component, 'closeDialog').and.stub();
      spyOn<any>(component, 'showLoading').and.stub();
      data = {
        detail: {
          email: 'test@test.com'
        }
      };
      mockUsers = new MockUsers();
      user = mockUsers.getUser1();
      spyOn(component, 'getUser').and.callFake(() => {
        component.currentUser = user;
      });
    });

    it('should display an error if the form is not filled in', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(true);
      const handleErrorSpy = spyOn<any>(component['registerService'], 'handleError').and.returnValue(of(''));
      component.onSubmit();
      expect(handleErrorSpy).toHaveBeenCalled();
    });

    it('should close dialog when passwords do not match', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(false);
      registerSpy = spyOn(component['registerService'], 'register').and.returnValue(of('Password Error'));
      component.onSubmit();
      expect(registerSpy).toHaveBeenCalled();
      expect(closeDialogSpy).toHaveBeenCalled();
    });

    it('should go to edit profile page on successful registration', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(false);
      component['userRegisterForm'].controls['email'].setValue('test@test.com');
      component['userRegisterForm'].controls['firstName'].setValue('Test');
      component['userRegisterForm'].controls['lastName'].setValue('User');
      component['userRegisterForm'].controls['age'].setValue(26);
      component['userRegisterForm'].controls['zip'].setValue(30075);
      component['userRegisterForm'].controls['password'].setValue('pass');
      component['userRegisterForm'].controls['confirmPassword'].setValue('pass');

      registerSpy = spyOn(component['registerService'], 'register').and.returnValue(of(data));
      loginSpy = spyOn(component['loginService'], 'login').and.returnValue(of(user));
      editProfileSpy = spyOn(component, 'editProfile').and.stub();
      component.onSubmit();
      expect(registerSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
      expect(editProfileSpy).toHaveBeenCalled();
    });

    it('should close dialog if login fails', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(false);
      component['userRegisterForm'].controls['email'].setValue('test@test.com');
      registerSpy = spyOn(component['registerService'], 'register').and.returnValue(of(data));
      loginSpy = spyOn(component['loginService'], 'login').and.returnValue(of(''));
      component.onSubmit();
      expect(registerSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
    });

    it('should close dialog if registratin fails', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(false);
      component['userRegisterForm'].controls['email'].setValue('test2@test.com');
      registerSpy = spyOn(component['registerService'], 'register').and.returnValue(of(''));
      component.onSubmit();
      expect(registerSpy).toHaveBeenCalled();
      expect(closeDialogSpy).toHaveBeenCalled();
    });
  });
});
