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

  constructor(
    protected http: HttpClient
    ) {
      // super(http);
    }


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control': 'Access-Control-Allow-Headers'
    })
  };


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

  public login(email, password): Observable<User> {
    return this.http.post('/api/authorizeUser', { // TODO need the correct call
      email,
      password
    }, this.httpOptions).pipe(map((resp: any) => {
      if (resp) {
        console.log(resp);
          // if the user is not active then deny the login
        if (resp.detail.is_active) {
        // TODO check if resp.detail.someProperty matches to its source from the backend
          this.authToken = resp.auth.accessToken;
          this.currUser.id = resp.detail.id;
          this.currUser.email = resp.detail.email;
          this.currUser.firstName = resp.detail.first_name;
          this.currUser.lastName = resp.detail.last_name;
          this.currUser.age = resp.detail.age;
          this.currUser.active = resp.detail.is_active;
          this.currUser.type = this.typeToString(resp.detail.user_type);

          localStorage.setItem('access-token', this.authToken);
          localStorage.setItem('user', JSON.stringify(this.currUser));
          console.log(this.currUser);
          return Object.assign({}, this.currUser);
        }
      }
        return null;
      })); // .pipe(catchError(err => this.handleError(err)));
    }
    protected logout() {
      this.currUser = null;
      this.authToken = null;
      localStorage.clear();
    }
  }
