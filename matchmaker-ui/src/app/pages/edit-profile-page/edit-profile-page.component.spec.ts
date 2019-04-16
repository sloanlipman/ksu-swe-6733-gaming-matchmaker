import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePage } from './edit-profile-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EditProfileService } from 'src/app/shared/services/edit-profile-service/edit-profile.service';
import { MockUsers } from '../../shared/mock-users';

describe('EditProfilePage', () => {
  const mockUsers = new MockUsers();
  const user1 = mockUsers.getUser1();
  let component: EditProfilePage;
  let fixture: ComponentFixture<EditProfilePage>;
  let existingUserSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [
        EditProfilePage
      ],
      providers: [
        HttpService,
        EditProfileService,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePage);
    component = fixture.componentInstance;
    spyOn(component, 'getUser').and.callFake(() => {
      component.currentUser = user1;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Existing user', () => {
    it('should be an existing user', () => {
      component.currentUser.interests = ['Fake Interest'];
      const existing = component.isExistingUser();
      expect(existing).toBe(true);
    });

    it('should be a new user', () => {
      component.currentUser.interests = [];
      const existing = component.isExistingUser();
      expect(existing).toBe(false);
    });
  });


  xdescribe('OnSubmit', () => {
    beforeEach(() => {
     // spyOn()
    });
  });

});
