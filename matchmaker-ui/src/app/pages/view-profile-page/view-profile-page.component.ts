import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'view-profile',
  templateUrl: './view-profile-page.component.html',
  styleUrls: ['./view-profile-page.component.scss']
})
export class ViewProfilePage extends AppComponent  implements OnInit {
  // TODO add genres and time here
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
    this.closeDialog();
  }
}

// TODO need to define a variable to hold the details for the user whose profile is being viewed
