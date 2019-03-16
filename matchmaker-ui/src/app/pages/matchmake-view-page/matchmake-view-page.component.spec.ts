import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakeViewPage } from './matchmake-view-page.component';

describe('MatchmakeViewPage', () => {
  let component: MatchmakeViewPage;
  let fixture: ComponentFixture<MatchmakeViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakeViewPage ]
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
