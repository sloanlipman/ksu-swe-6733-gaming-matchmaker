import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfilePage } from './view-profile-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMaterialModule } from 'src/app/app-material.module';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';

describe('ViewProfilePage', () => {
  let component: ViewProfilePage;
  let fixture: ComponentFixture<ViewProfilePage>;

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
    fixture = TestBed.createComponent(ViewProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
