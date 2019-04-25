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
import { of } from 'rxjs';
import { User } from 'src/app/shared/models/user';

describe('EditProfilePage', () => {
  const mockUsers = new MockUsers();
  const user1 = mockUsers.getUser1();
  let component: EditProfilePage;
  let fixture: ComponentFixture<EditProfilePage>;
  let goHomeSpy;
  let updateUserSpy;
  let saveProfileSpy;
  let dismissLoadingSpy;
  let handleErrorSpy;

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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePage);
    component = fixture.componentInstance;
    spyOn(component, 'getUser').and.callFake(() => {
      component.currentUser = user1;
    });
    spyOn<any>(component, 'showLoading').and.stub();
    component.allPriorities = [];
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


  describe('SubmitChanges', () => {
    beforeEach(() => {
      goHomeSpy = spyOn(component, 'goHome').and.stub();
      updateUserSpy = spyOn(component['editProfileService'], 'updateUser').and.callThrough();
      dismissLoadingSpy = spyOn<any>(component, 'dismissLoading').and.stub();
      handleErrorSpy = spyOn(component['editProfileService'], 'handleError').and.stub();
    });

    it('should handle error for invalid form', () => {
      spyOnProperty(component.infoForm, 'invalid').and.returnValue(true);
      component.submitChanges();
      expect(handleErrorSpy).toHaveBeenCalledWith('Please fill in all required fields and try again');
    });

    it('should handle error for no interests selected', () => {
      component.interestsBoxes.setValue([]);
      fixture.detectChanges();
      component.submitChanges();
      expect(handleErrorSpy).toHaveBeenCalledWith('Please select at least one interest and try again');
    });

    it('should submit the user\'s changes when forms are correctly filled out', () => {
      component.f.email.setValue('NewEmail@123.com');
      component.f.firstName.setValue('Thor');
      component.f.lastName.setValue('Odinson');
      component.f.age.setValue(1000);
      component.f.zip.setValue(30068);
      component.interestsBoxes.setValue(['Drinking', 'Fighting', 'Flying with a hammer']);
      const newUser = JSON.stringify({
        id: 127,
        email: 'NewEmail@123.com',
        first_name: 'Thor',
        last_name: 'Odinson',
        age: 1000,
        is_active: true,
        user_type: 2,
        location: {
          zip: 30068
        },
        interests: ['Drinking', 'Fighting', 'Flying with a hammer'],
        genres: null,
        priorities: '' // TODO update this when ordered priorities is funtional
      });

      saveProfileSpy = spyOn(component['editProfileService'], 'saveProfile').and.returnValue(of(JSON.parse(newUser)));

      component.submitChanges();

      expect(saveProfileSpy).toHaveBeenCalledWith(newUser, 127);
      expect(updateUserSpy).toHaveBeenCalledWith(JSON.parse(newUser));
      expect(goHomeSpy).toHaveBeenCalled();
    });
    it('should dismiss loading if no data is returned', () => {
      saveProfileSpy = spyOn(component['editProfileService'], 'saveProfile').and.returnValue(of(false));
      component.f.email.setValue('NewEmail@123.com');
      component.f.firstName.setValue('Thor');
      component.f.lastName.setValue('Odinson');
      component.f.age.setValue(1000);
      component.f.zip.setValue(30068);
      component.interestsBoxes.setValue(['Drinking', 'Fighting', 'Flying with a hammer']);
      const newUser = JSON.stringify({
        id: 127,
        email: 'NewEmail@123.com',
        first_name: 'Thor',
        last_name: 'Odinson',
        age: 1000,
        is_active: true,
        user_type: 2,
        location: {
          zip: 30068
        },
        interests: ['Drinking', 'Fighting', 'Flying with a hammer']
      });

      component.submitChanges();
      expect(dismissLoadingSpy).toHaveBeenCalled();
      });

  });

  describe('Compare', () => {
    beforeEach(() => {
    });
    it('should return true for matches', () => {
      const comparison = component.compare('a', 'a');
      expect(comparison).toEqual(true);
    });

    it('should return false for mismatches', () => {
      const comparison = component.compare('a', 'b');
      expect(comparison).toEqual(false);
    });
  });

});
