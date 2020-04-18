import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppMaterialModule } from 'src/app/app-material.module';
import { EditProfileServiceMock, HttpServiceMock, MatDialogMock } from 'src/app/shared/mocks/mocks';
import { EditProfileService } from 'src/app/shared/services/edit-profile-service/edit-profile.service';
import { HttpService } from 'src/app/shared/services/http-service/http.service';

import { MockUsers } from '../../shared/mocks/mock-users';
import { EditProfilePage } from './edit-profile-page.component';

describe('EditProfilePage', () => {
  let user1;
  let component: EditProfilePage;
  let fixture: ComponentFixture<EditProfilePage>;
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

    spyOn(component, 'goHome').and.stub();
    spyOn(editProfileService, 'updateUser').and.stub();

    user1 = MockUsers.prototype.getUser1();
    component.currentUser = user1;
  });

  describe('SubmitChanges', () => {
    it('should submit the user\'s changes when forms are correctly filled out', () => {
      spyOn(editProfileService, 'saveProfile').and.returnValue(of(user1));

      component.submitChanges(user1);

      expect(editProfileService.saveProfile).toHaveBeenCalledWith(127, JSON.stringify(user1));
      expect(editProfileService.updateUser).toHaveBeenCalledWith(user1);
      expect(component.goHome).toHaveBeenCalled();
    });
  });
});
