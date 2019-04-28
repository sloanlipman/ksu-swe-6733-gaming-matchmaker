import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfilePage } from './view-profile-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/app-material.module';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MockUsers } from 'src/app/shared/mocks/mock-users';


describe('ViewProfilePage', () => {
  let component: ViewProfilePage;
  let fixture: ComponentFixture<ViewProfilePage>;
  let user1;
  let mockUsers;
  let findUserSpy;
  let user2;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfilePage ],
      imports: [
        RouterTestingModule,
        AppMaterialModule,
        HttpClientModule
      ],
      providers: [HttpService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  mockUsers = new MockUsers();
  user1 = mockUsers.getUser1();
  user2 = mockUsers.getUser2();

    fixture = TestBed.createComponent(ViewProfilePage);
    component = fixture.componentInstance;
    findUserSpy = spyOn(component, 'findUser').and.callFake(() => {
      component.user = user1;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find user', () => {
    findUserSpy.and.callThrough();
    localStorage.setItem('clickedUser', JSON.stringify(user2));
    component.findUser();
    expect(component.user).toEqual(user2);
    localStorage.clear();
  });
});
