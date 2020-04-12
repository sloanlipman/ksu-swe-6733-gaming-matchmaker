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
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MockUsers } from 'src/app/shared/mocks/mock-users';
import { RegisterServiceMock, LoginServiceMock, HttpServiceMock, MatDialogMock } from 'src/app/shared/mocks/mocks';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let registerSpy;
  let loginSpy;
  let editProfileSpy;
  let closeDialogSpy;
  let getUserSpy;
  let handleRegistrationSpy;
  let loginService;
  let registerService;

  const user = MockUsers.prototype.getNewUser();
  const data = {
    detail: {
      email: 'test@test.com'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, RouterTestingModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [RegisterPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: RegisterService, useClass: RegisterServiceMock },
        { provide: LoginService, useClass: LoginServiceMock },
        { provide: HttpService, useClass: HttpServiceMock },
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    loginService = TestBed.get(LoginService);
    registerService = TestBed.get(RegisterService);

    closeDialogSpy = spyOn<any>(component, 'closeDialog').and.stub();
    handleRegistrationSpy = spyOn(component, 'handleRegistration').and.stub();
    editProfileSpy = spyOn(component, 'editProfile').and.stub();
    getUserSpy = spyOn(component, 'getUser').and.stub();

    loginSpy = spyOn(loginService, 'login').and.returnValue(of(user));
    registerSpy = spyOn(registerService, 'register').and.returnValue(of(data));
  });

  it('should not register a user when passwords do not match', () => {
    component.onSubmit(user, 'aligator123', 'aligator122');

    expect(closeDialogSpy).toHaveBeenCalled();
    expect(registerSpy).not.toHaveBeenCalled();
    expect(handleRegistrationSpy).not.toHaveBeenCalled();
  });

  it('should handle a successful registration', () => {
    component.onSubmit(user, 'aligator123', 'aligator123');
    expect(registerSpy).toHaveBeenCalledWith(
      user.email,
      user.firstName,
      user.lastName,
      user.age,
      user.location.zip,
      'aligator123',
      'aligator123'
    );
    expect(handleRegistrationSpy).toHaveBeenCalledWith(data, 'aligator123');
  });

  it('Should handle a successful registration', () => {
    handleRegistrationSpy.and.callThrough();

    component.handleRegistration(data, 'aligator123');

    expect(loginSpy).toHaveBeenCalledWith(data.detail.email, 'aligator123');
    expect(editProfileSpy).toHaveBeenCalled();
    expect(getUserSpy).toHaveBeenCalled();
  });
});
