import { Location } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPage } from '../landing-page/landing-page.component';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { MatchmakingService } from 'src/app/shared/services/matchmaking-service/matchmaking.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'matchmaking',
  templateUrl: './matchmake-view-page.component.html',
  styleUrls: ['./matchmake-view-page.component.scss']
})
export class MatchmakeViewPage extends AppComponent implements OnInit {
  matches: User[] = [];
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected matchmakingService: MatchmakingService
  ) {
    super(injector, dialog);
  }

  ngOnInit() {
    this.getUser();
    this.matchmakingService.getMatches(this.currentUser.id).subscribe(data => {
      if (data) {
        for (let i = 0; i < data.length; ++i) {
          const player = new User(data[i]);
          this.matches.push(player);
        }
      }
      console.log('MATCHES ARE', this.matches);
    });
  }
}
