import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AboutPage } from './shared/components/about/about.component';
import { ContactPage } from './shared/components/contact-page/contact-page.component';
import { MatDialog } from '@angular/material';
import { User } from './shared/models/user';
import { LoadingIndicator } from './shared/components/loading-indicator/loading-indicator.component';
import { HttpService } from './shared/services/http-service/http.service';

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
  public currentUser: User;
  public url: string;
  isLoading = false;
  constructor(
    protected injector: Injector,
    protected dialog: MatDialog,
    protected httpService?: HttpService
  ) {
      this.router = this.injector.get(Router);
      this.location = this.injector.get(Location);
      this.httpService = this.injector.get(HttpService);
    }

  ngOnInit() {
  }

  setUrl() {
    this.url = this.router.url;
  }

  private showHome() {
    this.setUrl();
    if (
        this.url === '/landing-page' ||
        this.url === '/login' ||
        this.url === '/register'
      ) {
      return false;
    } else {
      return true;
    }
  }
  protected showAbout() {
    this.dialog.open(AboutPage, {
      height: '40rem',
      width: '60rem',
    });
  }

  protected showContact() {
    this.dialog.open(ContactPage, {
      height: '40rem',
      width: '60rem',
    });
  }

  protected showLoading() {
    this.dialog.open(LoadingIndicator, {
      height: '20rem',
      width: '60rem',
      disableClose: true
    });
    this.isLoading = true;
  }

  protected dismissLoading() {
    if (this.isLoading) {
      this.dialog.closeAll();
      this.isLoading = false;
    }
  }

  protected closeDialog() {
    this.dialog.closeAll();
  }

  getUser() {
    this.currentUser = new User(JSON.parse(localStorage.getItem('user')));
    console.log(this.currentUser);
  }
  goToLoginPage() {
    this.router.navigateByUrl('/login').then(() => {
      this.dismissLoading();
    });
  }

  register() {
    this.router.navigateByUrl('/register').then(() => {
      this.dismissLoading();
    });
  }

  goToLanding() {
    this.httpService.logout();
    this.router.navigateByUrl('/landing-page').then(() => {
      this.dismissLoading();
    });
   }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigateByUrl('/home').then(() => {
      this.dismissLoading();
    });
  }

  editProfile() {
    this.router.navigateByUrl('/edit-profile').then(() => {
      this.dismissLoading();
    });
  }
  viewProfile(id: any){
    this.router.navigateByUrl('/view-profile/' + id).then(() => {
      this.dismissLoading();
    });
  }

  viewMatchmaking(){
    this.router.navigateByUrl('/matchmaking').then(() => {
      this.dismissLoading();
    });
  }
}
