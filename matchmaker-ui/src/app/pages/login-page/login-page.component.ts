import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPage } from '../landing-page/landing-page.component';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { LoginService } from 'src/app/shared/services/login-service/login.service';

@Component({
  selector: 'login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginPageComponent implements OnInit {

  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected   loginService: LoginService
  ) {
    //super(injector, dialog);
  }

  ngOnInit() {
    this.authenticateCredentials('admin@aaa.com', 'admin');
  }


  authenticateCredentials(email, password) {
    this.loginService.login(email, password).subscribe(data => {
    console.log(data);
    });
  }
}

