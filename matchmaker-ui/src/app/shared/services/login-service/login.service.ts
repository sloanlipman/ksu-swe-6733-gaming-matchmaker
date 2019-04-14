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
        if (resp.detail.is_active) {
          this.updateUser(resp.detail, resp.accessToken);
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
