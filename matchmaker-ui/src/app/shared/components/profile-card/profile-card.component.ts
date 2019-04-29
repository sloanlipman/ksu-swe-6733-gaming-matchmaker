
import { Component, Input, ViewEncapsulation, Injector } from '@angular/core';
import { User } from '../../models/user';
import { R3TargetBinder } from '@angular/compiler';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileCard extends AppComponent{
  @Input() player: User;
  color: number;
  constructor(
    protected injector: Injector,
    protected dialog: MatDialog,
  ) {
    super(injector, dialog);
  }

  getRandomColor() {
    this.color = Math.floor((Math.random() * 10) + 1);
    switch (this.color) {
      case 1: return '#739db7';
      case 2: return '#37c6b8';
      case 3: return '#860e8e';
      case 4: return '#48ce70';
      case 5: return '#5a289b';
      case 6: return '#9b2891';
      case 7: return '#00876e';
      case 8: return '#6e4b72';
      case 9: return '#4e6d75';
      case 10: return '#767f82';
    }
  }
}

