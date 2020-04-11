import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http-service/http.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginService } from '../login-service/login.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends HttpService {
  constructor(protected http: HttpClient, public snackBar: MatSnackBar) {
    super(http, snackBar);
  }

  public register(
    email: string,
    firstName: string,
    lastName: string,
    age: string,
    zip: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    const userDetail = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      age: age,
      user_type: 2, // should register as a regular user
      location: {
        zip: zip
      }
    };
    if (password !== confirmPassword) {
      this.handleError('Passwords do not match');
      return of('Password Error');
    } else {
      return this.post('/api/register', { userDetail, password }, this.httpOptions)
        .pipe(
          map((resp: any) => {
            if (resp) {
              return resp;
            }
          })
        )
        .pipe(catchError((err) => this.handleError(err)));
    }
  }
}
