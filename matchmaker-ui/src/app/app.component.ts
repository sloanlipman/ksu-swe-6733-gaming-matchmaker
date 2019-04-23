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
  public allInterests = [];
  public allGenres = [];
  public allTimes = [];
  public allPriorities = [];
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
    this.goToLanding();
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
    return Promise.resolve();
  }

  protected closeDialog() {
    this.dialog.closeAll();
  }

   getUser() {
    this.currentUser =  new User(JSON.parse(localStorage.getItem('user')));
    this.httpService.getUser(this.currentUser.id).subscribe(data => {
    this.currentUser = data;
    console.log(this.currentUser);
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
    console.log('current user:', this.currentUser);
   }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigateByUrl('/home').then(() => {
      this.dismissLoading();
    });
  }

  async editProfile() {
    if (!this.isLoading) {
      this.showLoading();
    }
    const interestPromise = await Promise.resolve(this.getAllInterests());
    const timePromise = await Promise.resolve(this.getAllTimes());
    const priorityPromise = await Promise.resolve(this.getAllPriorities());
    const genrePromise = await Promise.resolve(this.getAllGenres());
    Promise.all([interestPromise, timePromise, priorityPromise, genrePromise]).then(() => {
      this.allInterests = JSON.parse(localStorage.getItem('interests'));
      this.allGenres = JSON.parse(localStorage.getItem('genres'));
      this.allTimes = JSON.parse(localStorage.getItem('times'));
      this.allPriorities = JSON.parse(localStorage.getItem('priorities'));
      this.router.navigateByUrl('/edit-profile').then(() => {
        this.dismissLoading();
      });
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

  async getAllInterests() {
    return new Promise((resolve) => {
      this.httpService.getAllInterests().subscribe(data => {
        if (data) {
          const interests = [];
          for (let i = 0; i < data.length; ++i) {
            interests.push(data[i]);
          }
          localStorage.setItem('interests', JSON.stringify(interests));
          }
        resolve();
      });
    });
  }

  getAllGenres() {
  //  const genres = ['Shooters', 'RPGs', 'RTS']; // TODO delete
  //  localStorage.setItem('genres', JSON.stringify(genres)); // TODO delete


    return new Promise((resolve) => {
      this.httpService.getAllGenres().subscribe(data => {
        if (data) {
          const genres = [];
          for (let i = 0; i < data.length; ++i) {
            genres.push(data[i]);
          }
          localStorage.setItem('genres', JSON.stringify(genres));
          }
        resolve();
      });
    });
  }

  getAllTimes() {

    const times = ['1', '2', '3']; // TODO delete
    localStorage.setItem('times', JSON.stringify(times)); // TODO delete
   /*
   return new Promise((resolve) => {
    this.httpService.getAllTimes().subscribe(data => {
      if (data) {
        const times = [];
        for (let i = 0; i < data.length; ++i) {
          times.push(data[i]);
        }
        localStorage.setItem('times', JSON.stringify(times));
        }
      resolve();
      });
    });
    */
  }

  getAllPriorities(){
    const priorities =  ['Location', 'Game Genres', 'Active Time', 'Interests'];
    localStorage.setItem('priorities', JSON.stringify(priorities));


  /*  return new Promise((resolve) => {
      this.httpService.getAllPriorities().subscribe(data => {
        if (data) {
          const priorities = [];
          for (let i = 0; i < data.length; ++i) {
            priorities.push(data[i]);
          }
          localStorage.setItem('times', JSON.stringify(priorities));
        }
      resolve();
      });
    }); */
  }

}
