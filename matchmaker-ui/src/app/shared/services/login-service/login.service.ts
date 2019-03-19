import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http-service/http.service';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService /* extends HttpService */ { // TODO decide if there needs to be a parent class to encapsulate http calls
  private authToken: string = null;
  private currUser: User = new User({
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    age: null,
    active: null,
    type: null
  });
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(
    protected http: HttpClient
    ) {
      // super(http);
    }

// TODO catch an error with an else statment?
  protected typeToString(type: number): string {
    if (type === 1) {
      return 'admin';
    } else if (type === 2) {
        return 'regular';
    }
  }

// TODO catch an error with an else statment?
  protected activeToBoolean(active: string): boolean {
    if (active === 'active') {
      return true;
    } else if (active === 'not_active') {
      return false;
    }
  }

  protected login(username, password): Observable<User> {
    // Call this.logout() to log out of current user?
    return this.http.post('/api/authorizeUser', { // TODO need the correct call
      username: username,
      password: password
    }, this.httpOptions).pipe(map((resp: any) => {
      if (resp) {
        console.log(resp);
        console.log(resp.data.active);
          // if the user is not active then deny the login
        if (resp.data.active === 'active') {
        // TODO check if resp.data.someProperty matches to its source from the backend
        //  this.authToken = resp.auth.accessToken; // TODO see if this is the right declaration
     //     this.currUser.id = resp.data.id;
          this.currUser.email = resp.data.email;
          this.currUser.firstName = resp.data.first_name;
          this.currUser.lastName = resp.data.last_name;
          this.currUser.age = resp.data.age;
          this.currUser.active = this.activeToBoolean(resp.data.active);
          this.currUser.type = this.typeToString(resp.data.type);

          localStorage.setItem('access-token', this.authToken);
          localStorage.setItem('user', JSON.stringify(this.currUser));
          return Object.assign({}, this.currUser);
        }
      } else {
          return null;
        }
      })); // .pipe(catchError(err => this.handleError(err)));
    }
    protected logout() {
      this.currUser = null;
      this.authToken = null;
      localStorage.clear();
    }
  }
