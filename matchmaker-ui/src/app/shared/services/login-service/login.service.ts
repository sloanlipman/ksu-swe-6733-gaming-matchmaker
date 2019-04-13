import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../http-service/http.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpService {

  constructor(
    protected http: HttpClient,
    public snackBar: MatSnackBar,
    ) {
      super(http, snackBar);
    }

  public login(email, password): Observable<User> {
    return this.post('/api/authorizeUser', {
      email,
      password
    }, this.httpOptions).pipe(map((resp: any) => {
      if (resp) {
        if (resp.detail.is_active) { // If the user is active, store it as the current user
          this.authToken = resp.auth.accessToken;
          this.currUser = new User({
            id: resp.detail.id,
            email: resp.detail.email,
            firstName: resp.detail.first_name,
            lastName: resp.detail.last_name,
            age: resp.detail.age,
            isActive: resp.detail.is_active,
            type: this.typeToString(resp.detail.user_type)
          });
          localStorage.setItem('access-token', this.authToken);
          localStorage.setItem('user', JSON.stringify(this.currUser));
          return Object.assign({}, this.currUser);
      } else { // If the user is not active, return an error
            this.currUser = null;
            const err = {
              error: 'inactive account'
            };
          this.handleError(err);
        }
      }
      return null;
    })).pipe(catchError(err => this.handleError(err))); // Catch server errors
  }
}
