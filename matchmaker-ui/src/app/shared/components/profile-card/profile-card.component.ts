
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileCard {
  @Input() player: User;
  constructor() {}
}

