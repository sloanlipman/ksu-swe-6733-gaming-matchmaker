
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { User } from '../../models/user';
import { R3TargetBinder } from '@angular/compiler';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileCard {
  @Input() player: User;
  color: number;
  constructor() {}

  getRandomColor() {
    this.color = Math.floor(Math.random() * 10);
    switch (this.color) {
      case 1: return '#739db7';
        break;
      case 2: return '#37c6b8';
        break;
      case 3: return '#860e8e';
        break;
      case 4: return '#48ce70';
        break;
      case 5: return '#5a289b';
        break;
      case 6: return '#9b2891';
        break;
      case 7: return '#00876e';
        break;
      case 8: return '#6e4b72';
        break;
      case 9: return '#4e6d75';
        break;
      case 10: return '#626d70';
        break;
    }
  }
}
