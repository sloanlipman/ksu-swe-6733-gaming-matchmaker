import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'view-profile',
  templateUrl: './view-profile-page.component.html',
  styleUrls: ['./view-profile-page.component.scss']
})
export class ViewProfilePage extends AppComponent implements OnInit {
  // TODO add genres and time here
  interests = [];
  genres = [];
  userId: string;
  user: any;
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected route: ActivatedRoute
  ) {
    super(injector, dialog);
  }

  ngOnInit() {
    this.findUser();
    this.closeDialog();
  }

  findUser() {
    this.user = JSON.parse(localStorage.getItem('clickedUser'));
  }
}
