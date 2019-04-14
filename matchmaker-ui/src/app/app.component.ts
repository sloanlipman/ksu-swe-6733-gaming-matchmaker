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
  protected allInterests = [];
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
    console.log('all interests:', this.allInterests.length);
  }

  setUrl() {
    this.url = this.router.url;
  }

  showHome() {
    this.setUrl();
    if (
        this.url === '/landing-page' ||
        this.url === '/login' ||
        this.url === '/register' ||
        this.url === '/edit-profile'
      ) {
      return false;
    } else {
      return true;
    }
  }
  showAbout() {
    this.dialog.open(AboutPage, {
      height: '30rem',
      width: '100rem',
    });
  }

  showContact() {
    this.dialog.open(ContactPage, {
      height: '60rem',
      width: '100rem',
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
    this.currentUser =  new User(JSON.parse(localStorage.getItem('user')));
    this.httpService.getUser(this.currentUser.id).subscribe(() => {
      console.log('got user');
    });
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
    if (this.currentUser) {
      console.log(this.currentUser);
      if (this.currentUser.interests.length === 0) {
        this.editProfile();
        return;
      }
    }
    this.router.navigateByUrl('/home').then(() => {
      this.dismissLoading();
    });
  }

  editProfile() {
    this.allInterests = JSON.parse(localStorage.getItem('interests'));
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


  async getAllInterests(): Promise<any> {
    console.log('getting interests');
        this.httpService.getAllInterests().subscribe(data => {
          if (data) {
            const interests = [];
            for (let i = 0; i < data.length; ++i) {
              interests.push(data[i]);
            }
            localStorage.setItem('interests', JSON.stringify(interests));
          }
        });
    return Promise.resolve();
  }
}
