import { Location } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPage } from '../landing-page/landing-page.component';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'matchmaking',
  templateUrl: './matchmake-view-page.component.html',
  styleUrls: ['./matchmake-view-page.component.scss']
})
export class MatchmakeViewPage extends AppComponent implements OnInit {

  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog
  ) {
    super(injector, dialog);
  }

  ngOnInit() {
  }
}
