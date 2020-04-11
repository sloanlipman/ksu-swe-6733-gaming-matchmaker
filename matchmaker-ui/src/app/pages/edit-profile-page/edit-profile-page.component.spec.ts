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
import { EditProfileServiceMock, HttpServiceMock, MatDialogMock } from 'src/app/shared/mocks/mocks';
import { MatDialog } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('EditProfilePage', () => {
  let mockUsers;
  let user1;
  let component: EditProfilePage;
  let fixture: ComponentFixture<EditProfilePage>;
  let goHomeSpy;
  let updateUserSpy;
  let saveProfileSpy;
  let handleErrorSpy;
  let ngOnInitSpy;
  let getAllListsSpy;
  let editProfileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [EditProfilePage],
      providers: [
        { provide: HttpService, useClass: HttpServiceMock },
        { provide: EditProfileService, useClass: EditProfileServiceMock },
        { provide: MatDialog, useClass: MatDialogMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePage);
    component = fixture.componentInstance;
    editProfileService = TestBed.get(EditProfileService);
    mockUsers = new MockUsers();
    user1 = mockUsers.getUser1();
    spyOn(component, 'getUser').and.callFake(() => {
      component.currentUser = user1;
    });

    ngOnInitSpy = spyOn(component, 'ngOnInit').and.stub();
    goHomeSpy = spyOn(component, 'goHome').and.stub();
    updateUserSpy = spyOn(editProfileService, 'updateUser').and.stub();
    handleErrorSpy = spyOn(editProfileService, 'handleError').and.stub();
    getAllListsSpy = spyOn(component, 'getAllLists');

    component.allInterests = [
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
    fixture.detectChanges();
  });

  describe('SubmitChanges', () => {
    it("should submit the user's changes when forms are correctly filled out", () => {
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
      spyOn(editProfileService, 'stringToType').and.returnValue(2);
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
        priorities: ['1', '2', '3', '4']
      });

      saveProfileSpy = spyOn(editProfileService, 'saveProfile').and.returnValue(of(JSON.parse(newUser)));

      component.submitChanges();

      expect(saveProfileSpy).toHaveBeenCalledWith(127, newUser);
      expect(updateUserSpy).toHaveBeenCalledWith(JSON.parse(newUser));
      expect(goHomeSpy).toHaveBeenCalled();
    });
  });
});
