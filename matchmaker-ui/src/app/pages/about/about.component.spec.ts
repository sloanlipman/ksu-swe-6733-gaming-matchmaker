import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPage } from './about.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { MatDialog, MatDialogRef } from '@angular/material';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [ AboutPage ],
      providers: [
        { provide: MatDialogRef, useValue: {}} // TODO this is a workaround. It needs MatDialogRef because it's in the constructor
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
