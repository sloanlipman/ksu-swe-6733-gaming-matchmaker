import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SplashPageComponent } from '../splash-page/splash-page.component';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginPageComponent extends SplashPageComponent implements OnInit {
  newUser: boolean;
  constructor(
    protected router: Router,
    protected location: Location,
  ) {
    super(router, location);
   this.newUser = false;
  }

  ngOnInit() {}

  goHome() {
    this.router.navigateByUrl('/home');
  }

  toggleCard() {
   this.newUser = !this.newUser;
    }
}
