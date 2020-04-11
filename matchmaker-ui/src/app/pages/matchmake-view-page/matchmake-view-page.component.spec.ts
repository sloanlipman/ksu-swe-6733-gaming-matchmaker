import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakeViewPage } from './matchmake-view-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MatchmakingService } from 'src/app/shared/services/matchmaking-service/matchmaking.service';
import { MockUsers } from 'src/app/shared/mocks/mock-users';

describe('MatchmakeViewPage', () => {
  let component: MatchmakeViewPage;
  let fixture: ComponentFixture<MatchmakeViewPage>;
  let mockUsers;
  let user1;

  beforeEach(async(() => {
    mockUsers = new MockUsers();
    user1 = mockUsers.getUser1();
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, RouterTestingModule, HttpClientModule],
      declarations: [MatchmakeViewPage],
      providers: [HttpService, MatchmakingService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakeViewPage);
    component = fixture.componentInstance;
    localStorage.setItem('matches', JSON.stringify([user1]));
    fixture.detectChanges();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
