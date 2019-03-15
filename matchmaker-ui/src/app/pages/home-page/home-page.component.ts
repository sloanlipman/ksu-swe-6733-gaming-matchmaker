import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

/**
 * This page can hold both user and admin views. Shared functionality will always be visible.
 * Admin-specific tools will be restricted by *ngIf statements in the html
 */
@Component({
  selector: 'home',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }
  logOut() {
   this.router.navigateByUrl('/splash-page');
  }

  editProfile() {
    this.router.navigateByUrl('edit-profile');
  }
  viewMatchmaking(){
    this.router.navigateByUrl('/matchmaking');
  }
}
