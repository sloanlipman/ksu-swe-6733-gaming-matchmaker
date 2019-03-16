import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

/**This page will be the launch point of the app. We can use it as a landing page,
* or we can use it to initialize and send the user on their way
*/
 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    protected router: Router,
    protected location: Location
    ){
    }

  private showHome() {
   const url = this.router.url;
   if (url === '/landing-page' || url === '/login' || url === '/register') {
     return false;
   } else {
     return true;
   }
  }

  private goHome() {
    this.router.navigateByUrl('/home');
  }
}
