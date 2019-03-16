import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPage implements OnInit {

  constructor(
    protected router: Router,
    protected location: Location
  ) { }

  ngOnInit() {

  }

  login() {
    this.router.navigateByUrl('/login-page');
  }

  register() {
    this.router.navigateByUrl('/register-page');
  }

  logOut() {
    this.router.navigateByUrl('/landing-page');
   }

  goBack() {
    this.location.back();
  }
}
