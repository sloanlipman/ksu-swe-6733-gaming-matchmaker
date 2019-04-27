import { Location } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
<<<<<<< HEAD
import { MatchmakingService } from 'src/app/shared/services/matchmaking-service/matchmaking.service';
=======
import { MockUsers } from 'src/app/shared/mocks/mock-users';
>>>>>>> d2c6dfefc855f1f7db708ec8cbdfcd2f09c1bc9b
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

  ngOnInit() {}
}
