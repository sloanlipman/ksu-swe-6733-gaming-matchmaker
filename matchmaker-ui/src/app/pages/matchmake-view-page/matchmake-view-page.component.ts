import { Location } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
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
    this.matches = JSON.parse(localStorage.getItem('matches'));
  }
}
