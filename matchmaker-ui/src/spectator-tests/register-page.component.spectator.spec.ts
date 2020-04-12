import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { LoginService } from 'src/app/shared/services/login-service/login.service';
import { RegisterService } from 'src/app/shared/services/register-service/register.service';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { MockUsers } from 'src/app/shared/mocks/mock-users';
import { RegisterPage } from 'src/app/pages/register-page/register-page.component';

fdescribe('RegisterPage (Spectator Tests)', () => {
  let spectator: Spectator<RegisterPage>;
  let registerSpy;
  let loginSpy;
  let editProfileSpy;
  let closeDialogSpy;
  let getUserSpy;
  let handleRegistrationSpy;
  let loginService;
  let registerService;

  const createComponent = createComponentFactory({
    component: RegisterPage,
    componentMocks: [LoginService, RegisterService, HttpService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    detectChanges: false
  });

  const user = MockUsers.prototype.getNewUser();
  const data = {
    detail: {
      email: 'test@test.com'
    }
  };

  beforeEach(() => {
    spectator = createComponent();
    handleRegistrationSpy = spyOn(spectator.component, 'handleRegistration');
    editProfileSpy = spyOn(spectator.component, 'editProfile');
    getUserSpy = spyOn(spectator.component, 'getUser');
    closeDialogSpy = spyOn<any>(spectator.component, 'closeDialog');

    registerService = spectator.get<RegisterService>(RegisterService, true);
    loginService = spectator.get<LoginService>(LoginService, true);

    registerSpy = registerService.register.andReturn(of(data));
    loginSpy = loginService.login.andReturn(of(data));
  });

  it('should not register a user when passwords do not match', () => {
    spectator.component.onSubmit(user, 'aligator123', 'aligator122');

    expect(closeDialogSpy).toHaveBeenCalled();
    expect(registerSpy).not.toHaveBeenCalled();
    expect(handleRegistrationSpy).not.toHaveBeenCalled();
  });

  it('should handle a successful registration', () => {
    spectator.component.onSubmit(user, 'aligator123', 'aligator123');
    expect(registerService.register).toHaveBeenCalledWith(
      user.email,
      user.firstName,
      user.lastName,
      user.age,
      user.location.zip,
      'aligator123',
      'aligator123'
    );
    expect(spectator.component.handleRegistration).toHaveBeenCalledWith(data, 'aligator123');
  });

  it('Should handle a successful registration', () => {
    handleRegistrationSpy.and.callThrough();

    spectator.component.handleRegistration(data, 'aligator123');

    expect(loginSpy).toHaveBeenCalledWith(data.detail.email, 'aligator123');
    expect(editProfileSpy).toHaveBeenCalled();
    expect(getUserSpy).toHaveBeenCalled();
  });
});
