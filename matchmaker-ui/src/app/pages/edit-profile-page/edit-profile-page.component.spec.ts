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
import { MockUsers } from '../../shared/mocks/mock-users';
import { of } from 'rxjs';
import { User } from 'src/app/shared/models/user';

describe('EditProfilePage', () => {
  let mockUsers;
  let user1;
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
    mockUsers = new MockUsers();
    user1 = mockUsers.getUser1();
    spyOn(component, 'getUser').and.callFake(() => {
      component.currentUser = user1;
    });
    spyOn(component, 'ngOnInit').and.stub();
    component.allInterests = [];
    component.allGenres = [];
    component.allTimes = [];
    component.allPriorities = [];
    component.allInterests =  [
      'Animation',
      'Video gaming',
      '3D printing',
      'Singing',
      'Woodworking',
      'Yodeling',
      'Acting',
      'Acrobatics',
      'Hiking',
      'Yoga',
      'Amateur radio'
    ];
    component.allGenres = ['RPG', 'Shooters'];
    component.allTimes = ['Morning', 'Afternoon', 'Evening', 'Late night'];
    component.allPriorities = ['Interests', 'Genres', 'Times', 'Location'];
    component.getFormControls();
    component.currentUser = user1;
    component.selectedPriorities = [];
   // setTimeout(() => component.setFormControls());
    spyOn<any>(component, 'showLoading').and.stub();
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Existing user', () => {
    it('should be an existing user', () => {
      component.currentUser = user1;
      const existing = component.isExistingUser();
      expect(existing).toBe(true);
    });

    it('should be a new user', () => {
      component.currentUser.interests = [];
      const existing = component.isExistingUser();
      expect(existing).toBe(false);
    });
  });


  describe('SubmitChanges', async() => {
    beforeEach(() => {
      goHomeSpy = spyOn(component, 'goHome').and.stub();
      updateUserSpy = spyOn(component['editProfileService'], 'updateUser').and.stub();
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
      spyOnProperty(component.infoForm, 'invalid').and.returnValue(false);

      component.submitChanges();
      expect(handleErrorSpy).toHaveBeenCalledWith('Please select at least one interest and try again');
    });

    it('should handle error for no genres selected', () => {
      spyOnProperty(component.infoForm, 'invalid').and.returnValue(false);
      component.genreBoxes.setValue([]);
      component.interestsBoxes.setValue(['Hiking']);
      fixture.detectChanges();
      component.submitChanges();
      expect(handleErrorSpy).toHaveBeenCalledWith('Please select at least one game genre and try again');
    });

    it('should handle error for no times selected', () => {
      spyOnProperty(component.infoForm, 'invalid').and.returnValue(false);
      component.timeBoxes.setValue([]);
      component.interestsBoxes.setValue(['Hiking']);
      component.genreBoxes.setValue(['RPGs']);
      fixture.detectChanges();
      component.submitChanges();
      expect(handleErrorSpy).toHaveBeenCalledWith('Please select at least one active time and try again');
    });

    it('should handle error for no priorities selected', () => {
      spyOnProperty(component.infoForm, 'invalid').and.returnValue(false);
      component.timeBoxes.setValue(['Afternoon']);
      component.interestsBoxes.setValue(['Hiking']);
      component.genreBoxes.setValue(['RPGs']);
      for (let i = 0; i < component.prioritiesFormArray.controls.length; ++i) {
        component.prioritiesFormArray.controls[i].setValue([]);
      }
      fixture.detectChanges();
      component.submitChanges();
      expect(handleErrorSpy).toHaveBeenCalledWith('Please select your matchmaking priorities and try again');
    });

  // TODO selected priorities keeps coming back as having all 4 selected - we want to duplicate at least one
    xit('should handle error for non-unique priorities selected', () => {
      spyOnProperty(component.infoForm, 'invalid').and.returnValue(false);
      component.selectedPriorities = [];
      component.timeBoxes.setValue(['Afternoon']);
      component.interestsBoxes.setValue(['Hiking']);
      component.genreBoxes.setValue(['RPGs']);
      fixture.detectChanges();
      component.submitChanges();
      expect(handleErrorSpy).toHaveBeenCalledWith('Please make unique selections for your matchmaking priorities and try again');
    });

    it('should submit the user\'s changes when forms are correctly filled out', () => {
      component.f.email.setValue('NewEmail@123.com');
      component.f.firstName.setValue('Thor');
      component.f.lastName.setValue('Odinson');
      component.f.age.setValue(1000);
      component.f.zip.setValue(30068);
      component.interestsBoxes.setValue(['Drinking', 'Fighting', 'Flying with a hammer']);
      component.timeBoxes.setValue(['Morning']);
      component.genreBoxes.setValue(['RPGs']);
      component.prioritiesFormArray.controls[0].setValue('1');
      component.prioritiesFormArray.controls[1].setValue('2');
      component.prioritiesFormArray.controls[2].setValue('3');
      component.prioritiesFormArray.controls[3].setValue('4');
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
        genres: ['RPGs'],
        times: ['Morning'],
        priorities: ['1', '2', '3', '4'],
      });

      saveProfileSpy = spyOn(component['editProfileService'], 'saveProfile').and.returnValue(of(JSON.parse(newUser)));

      component.submitChanges();

      expect(saveProfileSpy).toHaveBeenCalledWith(newUser);
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
      component.genreBoxes.setValue(['RPGs']);
      component.timeBoxes.setValue(['Morning']);
      component.prioritiesFormArray.controls[0].setValue('1');
      component.prioritiesFormArray.controls[1].setValue('2');
      component.prioritiesFormArray.controls[2].setValue('3');
      component.prioritiesFormArray.controls[3].setValue('4');
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
