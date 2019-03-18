import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AboutPage } from './pages/about/about.component';
import { ContactPage } from './pages/contact-page/contact-page.component';
import { MatDialog, MatDialogRef } from '@angular/material';

/**This page will be the launch point of the app. We can use to initialize and send the user on their way
  Any HTML associated with this component will be persistent throughout the app
*/
 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected router: Router;
  protected location: Location;
  constructor(
    protected injector: Injector,
    protected dialog: MatDialog
  ) {
      this.router = this.injector.get(Router);
      this.location = this.injector.get(Location);
    }
ngOnInit() {
  console.log(this.dialog);
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

  protected closeDialog() {
    this.dialog.closeAll();
  }
  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  logOut() {
    this.router.navigateByUrl('/landing-page');
   }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  editProfile() {
    this.router.navigateByUrl('/edit-profile');
  }
  viewMatchmaking(){
    this.router.navigateByUrl('/matchmaking');
  }
}
