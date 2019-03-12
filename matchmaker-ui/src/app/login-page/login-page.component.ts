import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SplashPageComponent } from '../splash-page/splash-page.component';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class LoginPageComponent extends SplashPageComponent implements OnInit {

  constructor(
    protected router: Router,
    protected location: Location,
  ) {
    super(router, location);
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

}
