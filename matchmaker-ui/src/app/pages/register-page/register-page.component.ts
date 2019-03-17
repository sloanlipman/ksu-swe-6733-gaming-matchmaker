import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LandingPage } from '../landing-page/landing-page.component';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPage extends AppComponent implements OnInit {

  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog
  ) {
    super(injector, dialog);
  }

  ngOnInit() {}
}
