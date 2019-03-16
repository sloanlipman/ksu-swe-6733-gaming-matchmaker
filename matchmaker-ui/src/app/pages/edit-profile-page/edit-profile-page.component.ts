import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPage } from '../landing-page/landing-page.component';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePage extends LandingPage implements OnInit {

  constructor(
    protected router: Router,
    protected location: Location
  ) {
    super(router, location);
  }

  ngOnInit() {
  }
  submitChanges() {
    this.router.navigateByUrl('/home');
  }
}
