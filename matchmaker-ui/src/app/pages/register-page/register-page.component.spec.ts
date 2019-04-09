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


describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit registration', () => {
// TODO add onSubmit tests here
  
  });
});
