import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SplashPageComponent } from '../splash-page/splash-page.component';

@Component({
  selector: 'register',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent extends SplashPageComponent implements OnInit {

  constructor(
    protected router: Router,
    protected location: Location
  ) {
    super(router, location);
   }

  ngOnInit() {
  }

  register() {
    this.router.navigateByUrl('/edit-profile');
  }
}
