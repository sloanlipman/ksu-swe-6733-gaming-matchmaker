import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakeViewPage } from './matchmake-view-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';

describe('MatchmakeViewPage', () => {
  let component: MatchmakeViewPage;
  let fixture: ComponentFixture<MatchmakeViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ MatchmakeViewPage ],
      providers: [HttpService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakeViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
