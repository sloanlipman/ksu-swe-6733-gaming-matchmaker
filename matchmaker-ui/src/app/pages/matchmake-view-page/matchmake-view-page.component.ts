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
  // Hardcoded for loop for demo purposes only. Once there is a backend connection, we might just need to do this once
  // Or we'll need to find a different way to do this if iterating over *ngFor messes with random colors
  // Random colors might not even look good later. This is just a POC
   /* for (let i = 0; i < 4; ++i) {
    document.getElementsByTagName('mat-card')[i].setAttribute('style', 'background-color:' + this.getColor());
    } */
  }

  getColor() {
    const color = Math.floor((Math.random() * 3 + 1));
    switch (color) {
      case 1:
        return 'red';
      case 2:
        return 'blue';
      case 3:
        return 'yellow';
    }
  }
}
