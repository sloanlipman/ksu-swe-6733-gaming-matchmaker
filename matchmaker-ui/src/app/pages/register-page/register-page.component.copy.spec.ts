import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RegisterPage } from './register-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material';
import {  ReactiveFormsModule,  FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login-service/login.service';
import { RegisterService } from 'src/app/shared/services/register-service/register.service';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterPage', () => {
  let spectator: Spectator<RegisterPage>;
  const createComponent  = createComponentFactory({
    component: RegisterPage,
    imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
    providers: [],
    componentMocks: [LoginService, RegisterService, HttpService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    detectChanges: false
  });

  // beforeEach(() => spectator = createComponent());

  it('Should call the register service to register and then handle a successful registration', () => {
    // const formGroup: FormGroup = spectator.component.userRegisterForm;
    // this.setFormControls(formGroup,
    //   ['email', 'firstName', 'lastName', 'age', 'zip', 'password', 'confirmPassword'],
    //   ['test@test.com', 'Test', 'User', 27, 99999, 'password', 'password']);
    spectator = createComponent();
    // console.log("Spectator is: ", spectator);
    spyOn<any>(spectator.component, 'showLoading');
    // spyOnProperty(spectator.component.userRegisterForm, 'invalid').and.returnValue(true);

    // const formBuilder 
      const registerService = spectator.inject<RegisterService>(RegisterService, true);
      registerService.register.andReturn(of({
      detail: {
        email: 'mockEmail'
      }
    }));

    spyOn(spectator.component, 'handleRegistration');

    spectator.component.onSubmit();

    expect(spectator.component.handleRegistration).toHaveBeenCalledWith({
      detail: {
        email :'mockEmail'
      }
    });
  });
});
