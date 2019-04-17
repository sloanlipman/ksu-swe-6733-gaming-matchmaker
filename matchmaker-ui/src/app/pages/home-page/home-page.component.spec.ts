import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';
import { MockUsers } from 'src/app/shared/mock-users';

describe('HomePage', () => {
  let showAdminToolsSpy;
  const mockUsers = new MockUsers();
  const user2 = mockUsers.getUser2();
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ HomePage ],
      providers: [HttpService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    spyOn(component, 'getUser').and.callFake(() => {
      component.currentUser = user2;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show admin tools for admins', () => {
    showAdminToolsSpy = spyOn(component, 'showAdminTools').and.callThrough();
    component.showAdminTools();
    expect(showAdminToolsSpy).toBeTruthy();
  });
});
