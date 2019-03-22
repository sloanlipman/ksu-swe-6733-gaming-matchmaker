import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http-service/http.service';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authToken: string = null;
  public currUser: User = new User({
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
    ) {}

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

  public login(email, password): Observable<User> {
    return this.http.post('/api/authorizeUser', {
      email,
      password
    }, this.httpOptions).pipe(map((resp: any) => {
      if (resp) {
        console.log(resp);
        if (resp.detail.is_active) {
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
    protected Logout() {
      this.currUser = null;
      this.authToken = null;
      localStorage.clear();
    }
  }
