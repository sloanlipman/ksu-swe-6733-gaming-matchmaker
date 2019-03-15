import { Component, OnInit } from '@angular/core';
import { SplashPageComponent } from '../splash-page/splash-page.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'matchmaking',
  templateUrl: './matchmake-view-page.component.html',
  styleUrls: ['./matchmake-view-page.component.scss']
})
export class MatchmakeViewPageComponent extends SplashPageComponent implements OnInit {

  constructor(
    protected router: Router,
    protected location: Location
  ) {
    super(router, location);
  }

  ngOnInit() {
  }

}
