import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LandingPage } from '../landing-page/landing-page.component';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginPageComponent extends LandingPage implements OnInit {
  constructor(
    protected router: Router,
    protected location: Location,
  ) {
    super(router, location);
  }

  ngOnInit() {}

  goHome() {
    this.router.navigateByUrl('/home');
  }
}
