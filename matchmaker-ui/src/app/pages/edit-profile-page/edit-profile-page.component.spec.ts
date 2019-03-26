import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePage } from './edit-profile-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('EditProfilePage', () => {
  let component: EditProfilePage;
  let fixture: ComponentFixture<EditProfilePage>;
  let routerSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [ EditProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate home', () => {
    routerSpy = spyOn<any>(component['router'], 'navigateByUrl').and.stub();
    component.submitChanges();
    expect(routerSpy).toHaveBeenCalledWith('/home');
  });
});
