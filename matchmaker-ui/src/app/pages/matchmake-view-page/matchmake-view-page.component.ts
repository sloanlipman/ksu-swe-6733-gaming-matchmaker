import { Component, OnInit } from '@angular/core';
import { LandingPage } from '../landing-page/landing-page.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'matchmaking',
  templateUrl: './matchmake-view-page.component.html',
  styleUrls: ['./matchmake-view-page.component.scss']
})
export class MatchmakeViewPage extends LandingPage implements OnInit {

  constructor(
    protected router: Router,
    protected location: Location
  ) {
    super(router, location);
  }

  ngOnInit() {
  }

}
