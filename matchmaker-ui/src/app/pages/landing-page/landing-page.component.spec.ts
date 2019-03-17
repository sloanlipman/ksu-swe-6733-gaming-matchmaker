import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPage } from './landing-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LandingPage', () => {
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, RouterTestingModule],
      declarations: [ LandingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
