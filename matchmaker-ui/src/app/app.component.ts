import { Component } from '@angular/core';

/**This page will be the launch point of the app. We can use it as a splash page,
* or we can use it to initialize and send the user on their way
*/
 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'matchmaker';
  constructor(){}
}
