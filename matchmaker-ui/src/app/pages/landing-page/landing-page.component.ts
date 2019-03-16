import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  logOut() {
    this.router.navigateByUrl('/landing-page');
   }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  editProfile() {
    this.router.navigateByUrl('/edit-profile');
  }
  viewMatchmaking(){
    this.router.navigateByUrl('/matchmaking');
  }
}
