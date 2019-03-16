import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LandingPage } from '../landing-page/landing-page.component';

@Component({
  selector: 'register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPage extends LandingPage implements OnInit {
  
  constructor(
    protected router: Router,
    protected location: Location,
  ) {
    super(router, location);
  }

  ngOnInit() {}
}
