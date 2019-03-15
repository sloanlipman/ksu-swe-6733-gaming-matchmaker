import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.scss']
})
export class SplashPageComponent implements OnInit {

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
    this.router.navigateByUrl('/register');
  }

  goBack() {
    this.location.back();
  }
}
