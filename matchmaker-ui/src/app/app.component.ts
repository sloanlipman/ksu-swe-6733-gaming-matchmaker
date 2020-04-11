import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AboutPage } from './shared/components/about/about.component';
import { ContactPage } from './shared/components/contact-page/contact-page.component';
import { MatDialog } from '@angular/material';
import { User } from './shared/models/user';
import { LoadingIndicator } from './shared/components/loading-indicator/loading-indicator.component';
import { HttpService } from './shared/services/http-service/http.service';
import { MatchmakingService } from './shared/services/matchmaking-service/matchmaking.service';

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
  public matches = [];
  constructor(
    protected injector: Injector,
    protected dialog: MatDialog,
    protected httpService?: HttpService,
    protected matchmakingService?: MatchmakingService
  ) {
    this.router = this.injector.get(Router);
    this.location = this.injector.get(Location);
    this.httpService = this.injector.get(HttpService);
    this.matchmakingService = this.injector.get(MatchmakingService);
  }

  ngOnInit() {}

  setUrl() {
    this.url = this.router.url;
  }

  showHome() {
    this.setUrl();
    if (this.url === '/landing-page' || this.url === '/login' || this.url === '/register' || this.url === '/edit-profile') {
      return false;
    } else {
      return true;
    }
  }

  showViewButton() {
    this.setUrl();
    if (this.url === '/matchmaking') {
      return true;
    } else {
      return false;
    }
  }

  showAbout() {
    this.dialog.open(AboutPage, {
      height: '30rem',
      width: '100rem'
    });
  }

  showContact() {
    this.dialog.open(ContactPage, {
      height: '60rem',
      width: '100rem'
    });
  }
  protected closeDialog() {
    this.dialog.closeAll();
  }

  getUser() {
    this.currentUser = new User(JSON.parse(localStorage.getItem('user')));
    this.httpService.getUser(this.currentUser.id).subscribe((data) => {
      this.currentUser = data;
    });
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login').then(() => {});
  }

  register() {
    this.router.navigateByUrl('/register').then(() => {});
  }

  goToLanding() {
    this.httpService.logout();
    this.router.navigateByUrl('/landing-page').then(() => {});
  }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigateByUrl('/home').then(() => {});
  }

  async editProfile() {
    if (!this.isLoading) {
    }
    if (!this.allGenres || !this.allInterests || !this.allPriorities || !this.allTimes) {
      const interestPromise = await Promise.resolve(this.getAllInterests());
      const timePromise = await Promise.resolve(this.getAllTimes());
      const priorityPromise = await Promise.resolve(this.getAllPriorities());
      const genrePromise = await Promise.resolve(this.getAllGenres());
      Promise.all([interestPromise, timePromise, priorityPromise, genrePromise]).then(() => {
        this.router.navigateByUrl('/edit-profile').then(() => {});
      });
    } else {
      this.router.navigateByUrl('/edit-profile').then(() => {});
    }
  }

  viewProfile(user: User) {
    localStorage.setItem('clickedUser', JSON.stringify(user));
    this.router.navigateByUrl('/view-profile/' + user.id).then(() => {});
  }

  async viewMatchmaking() {
    await this.getMatches().then(() => {
      this.router.navigateByUrl('/matchmaking').then(() => {});
    });
  }

  async getAllInterests() {
    return new Promise((resolve) => {
      this.httpService.getAllInterests().subscribe((data) => {
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

  async getAllGenres() {
    return new Promise((resolve) => {
      this.httpService.getAllGenres().subscribe((data) => {
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

  async getAllTimes() {
    return new Promise((resolve) => {
      this.httpService.getAllTimes().subscribe((data) => {
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
  }

  getAllPriorities() {
    return new Promise((resolve) => {
      this.httpService.getAllPriorities().subscribe((data) => {
        if (data) {
          const priorities = [];
          for (let i = 0; i < data.length; ++i) {
            priorities.push(data[i]);
          }
          localStorage.setItem('priorities', JSON.stringify(priorities));
        }
        resolve();
      });
    });
  }

  getMatches() {
    return new Promise((resolve) => {
      this.currentUser = new User(JSON.parse(localStorage.getItem('user')));
      if (!this.matches) {
        this.matches = [];
        this.matchmakingService.getMatches(this.currentUser.id).subscribe((data) => {
          if (data) {
            for (let i = 0; i < data.length; ++i) {
              const match = new User(data[i]);
              this.matches.push(match);
            }
          }
          localStorage.setItem('matches', JSON.stringify(this.matches));
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  clearEverything() {
    this.httpService.logout();
    this.allGenres = null;
    this.allInterests = null;
    this.allPriorities = null;
    this.allTimes = null;
    this.currentUser = null;
  }
}
