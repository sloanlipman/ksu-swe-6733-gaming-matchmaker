import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';

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
export class HomePage extends AppComponent implements OnInit {
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog
  ) {
    super(injector, dialog);
  }

  ngOnInit() {
    this.getUser();
    this.allInterests = JSON.parse(localStorage.getItem('interests'));
    this.allGenres = JSON.parse(localStorage.getItem('genres'));
    this.allTimes = JSON.parse(localStorage.getItem('times'));
    this.allPriorities = JSON.parse(localStorage.getItem('priorities'));
    this.matches = JSON.parse(localStorage.getItem('matches'));

    this.dismissLoading(); // We might not actually need this, but better safe than sorry
  }

  showAdminTools(){
    if (this.currentUser.type === 'admin') {
      return true;
    }
  }

}
