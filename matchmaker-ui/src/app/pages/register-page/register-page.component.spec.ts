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
  let handleErrorSpy;
  let handleRegistrationSpy;

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

    handleRegistrationSpy = spyOn(component, 'handleRegistration').and.stub();
    fixture.detectChanges();
  });

  afterEach(() => {
    component['httpService'].snackBar.dismiss();
    fixture.destroy();
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
      handleErrorSpy = spyOn<any>(component['registerService'], 'handleError').and.returnValue(of(''));
    });

    it('should display an error if the form is not filled in', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(true);
      component.onSubmit();
      expect(handleErrorSpy).toHaveBeenCalledWith('Please fill in all required fields and try again');
    });

    it('should display an error if the age is too low', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(false);
      component.userRegisterForm.controls.age.setValue(16);
      component.onSubmit();
      expect(handleErrorSpy).toHaveBeenCalledWith('You must be 18 older to use this application');
    });

    it('should close dialog when passwords do not match', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(false);
      component.userRegisterForm.controls.age.setValue(18);
      registerSpy = spyOn(component['registerService'], 'register').and.returnValue(of('Password Error'));
      component.onSubmit();
      expect(registerSpy).toHaveBeenCalled();
      expect(closeDialogSpy).toHaveBeenCalled();
    });

    it('should go to edit profile page on successful registration', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(false);
      registerSpy = spyOn(component['registerService'], 'register').and.returnValue(of(data));
      loginSpy = spyOn(component['loginService'], 'login').and.returnValue(of(user));
      editProfileSpy = spyOn(component, 'editProfile').and.stub();
      component.onSubmit();
      expect(registerSpy).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
      expect(editProfileSpy).toHaveBeenCalled();
    });

    it('Should call the register service to register and then handle a successful registration', () => {
      // spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(false);
      // component.userRegisterForm.controls.age.setValue(18);
      // component['userRegisterForm'].controls['email'].setValue('test@test.com');
      registerSpy = spyOn(component['registerService'], 'register').and.returnValue(of(data));
      component.onSubmit();
      expect(registerSpy).toHaveBeenCalled();
      expect(handleRegistrationSpy).toHaveBeenCalled();
    });

    it('should close dialog if registration fails', () => {
      spyOnProperty(component.userRegisterForm, 'invalid').and.returnValue(false);
      component.userRegisterForm.controls.age.setValue(18);
      component['userRegisterForm'].controls['email'].setValue('test2@test.com');
      registerSpy = spyOn(component['registerService'], 'register').and.returnValue(of(''));
      component.onSubmit();
      expect(registerSpy).toHaveBeenCalled();
      expect(closeDialogSpy).toHaveBeenCalled();
    });
  });
});
