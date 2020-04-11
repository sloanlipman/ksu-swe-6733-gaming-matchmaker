import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { LoadingIndicator } from 'src/app/shared/components/loading-indicator/loading-indicator.component';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { LoginService } from 'src/app/shared/services/login-service/login.service';
import { MockUsers } from 'src/app/shared/mocks/mock-users';
import { User } from 'src/app/shared/models/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpServiceMock, LoginServiceMock } from 'src/app/shared/mocks/mocks';

describe('LoginPage', () => {
  let mockUsers;
  let user1;
  let user2;
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let loginService: LoginService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [LoginPage, LoadingIndicator],
      providers: [
        { provide: HttpService, useClass: HttpServiceMock },
        { provide: LoginService, useClass: LoginServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    mockUsers = new MockUsers();
    user1 = new User(mockUsers.getUser1());
    user2 = mockUsers.getUser2();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    loginService = TestBed.get(LoginService);
  });

  describe('onSubmit()', () => {
    beforeEach(() => {
      spyOn(component, 'goHome').and.stub();
      spyOn(component, 'editProfile').and.stub();
      spyOn<any>(component, 'closeDialog').and.stub();
    });

    it('Should call the editProfile() method when logging in as a new user', () => {
      spyOn(loginService, 'login').and.returnValue(of(user2));

      component.onSubmit('', '');
      expect(component.editProfile).toHaveBeenCalled();
    });

    it('Should call the goHome() when logging in as an established user', () => {
      spyOn(loginService, 'login').and.returnValue(of(user1));

      component.onSubmit('', '');
      expect(component.goHome).toHaveBeenCalled();
    });
  });
});
