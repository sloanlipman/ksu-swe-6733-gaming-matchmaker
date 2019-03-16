import { Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayerCardComponent implements OnInit {

  constructor() { }
  ngOnInit() {  }
}
