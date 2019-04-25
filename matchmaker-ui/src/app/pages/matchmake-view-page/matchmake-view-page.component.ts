import { Location } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPage } from '../landing-page/landing-page.component';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { MockUsers } from 'src/app/shared/mock-users';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'matchmaking',
  templateUrl: './matchmake-view-page.component.html',
  styleUrls: ['./matchmake-view-page.component.scss']
})
export class MatchmakeViewPage extends AppComponent implements OnInit {
  mockUsers = new MockUsers();
  matchList: User[];
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog
  ) {
    super(injector, dialog);
  }

  ngOnInit() {
    this.matchList = [this.mockUsers.getUser1(), this.mockUsers.getUser2()];
  }
}
