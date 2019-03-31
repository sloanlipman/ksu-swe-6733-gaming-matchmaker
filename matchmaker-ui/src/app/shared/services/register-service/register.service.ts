import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http-service/http.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginService } from '../login-service/login.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends HttpService {
  constructor(
    protected http: HttpClient,
    protected snackBar: MatSnackBar,
    protected loginService: LoginService
    ) {
      super(http, snackBar);
    }

  public register(
    email: string,
    firstName: string,
    lastName: string,
    age: number,
    // location: number? zip code?,
    password: string,
    confirmPassword: string
    ):  Observable<User>{

      const detail = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        age: age,
        is_active: true,
        user_type: 1,
     /*   location: {
          zip: '30075',
          city: 'Roswell',
          state: 'GA',
          lat: 34.0232f,
          long: 84.3616f,
          locationString: 'myLocation'
        } */
      };
      if (password !== confirmPassword) {
        return; // TODO call error
      } else {
        return this.http.post('/api/register', {detail},
         this.httpOptions).pipe(map((resp: any) => {
            if (resp) {
              console.log(resp);
            //  this.loginService.login(email, password);
            } else {
              console.log('no response');

            /** 1) Store email, firstName, lastName, age, and location as current user's attributes.
             *    Also mark current user as active and a regular user.
             *  2) Save this new user in localStorage.
             */
                  // create a user
                  /** Something like this - copied from login service. Maybe can encapsulate
                   *  this.currUser = new User({
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
                   */
            }
        })).pipe(catchError(err => this.handleError(err)));
     }
   }
  }
