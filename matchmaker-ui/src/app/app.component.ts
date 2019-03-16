import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContactPage } from './pages/contact-page/contact-page.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AboutPage } from './pages/about/about.component';


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
    protected location: Location,
    public dialog: MatDialog
    ){
    }

  private showHome() {
   const url = this.router.url;
   if (url === '/landing-page' ||
       url === '/login' ||
       url === '/register' ||
       url === '/edit-profile'
      ) {
     return false;
   } else {
     return true;
   }
  }

  private goHome() {
    this.router.navigateByUrl('/home');
  }

  private showAbout() {
    this.dialog.open(AboutPage, {
      height: '40rem',
      width: '60rem',
    });
  }

  private showContact() {
    this.dialog.open(ContactPage, {
      height: '40rem',
      width: '60rem',
    });
  }
}
