import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { LoadingIndicator } from 'src/app/shared/components/loading-indicator/loading-indicator.component';



describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let goHomeSpy;
  let closeDialogSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      declarations: [
        LoginPageComponent,
        LoadingIndicator ],
      providers: [
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
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
      closeDialogSpy = spyOn<any>(component, 'closeDialog').and.stub();
    });

    it('should not call any methods if the form fails validation', () => {
      spyOnProperty(component.userLoginForm, 'invalid').and.returnValue(true);
      component.onSubmit();
      expect(goHomeSpy).not.toHaveBeenCalled();
      expect(component['closeDialog']).not.toHaveBeenCalled();
    });

    it('should call goHome() on server response', () => {
      spyOnProperty(component.userLoginForm, 'invalid').and.returnValue(false);
      spyOn(component['loginService'], 'login').and.returnValue(of(true));
      component.onSubmit();
      expect(goHomeSpy).toHaveBeenCalled();
    });

    it('should dismiss loading indicator on no server response', () => {
      spyOnProperty(component.userLoginForm, 'invalid').and.returnValue(false);
      spyOn(component['loginService'], 'login').and.returnValue(of(false));
      component.onSubmit();
      expect(component['closeDialog']).toHaveBeenCalled();
    });
  });
});
