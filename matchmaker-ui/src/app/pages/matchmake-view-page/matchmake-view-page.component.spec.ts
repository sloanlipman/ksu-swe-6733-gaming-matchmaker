import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakeViewPageComponent } from './matchmake-view-page.component';

describe('MatchmakeViewPageComponent', () => {
  let component: MatchmakeViewPageComponent;
  let fixture: ComponentFixture<MatchmakeViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakeViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakeViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
