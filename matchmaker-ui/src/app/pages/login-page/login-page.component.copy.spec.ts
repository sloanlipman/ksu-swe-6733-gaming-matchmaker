import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { MockUsers } from 'src/app/shared/mocks/mock-users';
import { LoginPage } from './login-page.component';
import { LoginService } from 'src/app/shared/services/login-service/login.service';
import { User } from 'src/app/shared/models/user';

describe('RegisterPage', () => {
  let mockUsers;
  let user1;
  let user2;
  let spectator: Spectator<LoginPage>;
  let loginService;
  const createComponent = createComponentFactory({
    component: LoginPage,
    componentMocks: [LoginService, HttpService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    mockUsers = new MockUsers();
    user1 = new User(mockUsers.getUser1());
    user2 = mockUsers.getUser2();
    spyOn(spectator.component, 'goHome');
    spyOn(spectator.component, 'editProfile');
    loginService = spectator.get<LoginService>(LoginService, true);
  });

  it('Should call the editProfile() method when logging in as a new user', () => {
    loginService.login.andReturn(of(user2));

    spectator.component.onSubmit('', '');
    expect(spectator.component.editProfile).toHaveBeenCalled();
  });

  it('Should call the goHome() when logging in as an established user', () => {
    loginService.login.andReturn(of(user1));

    spectator.component.onSubmit('', '');
    expect(spectator.component.goHome).toHaveBeenCalled();
  });
});
