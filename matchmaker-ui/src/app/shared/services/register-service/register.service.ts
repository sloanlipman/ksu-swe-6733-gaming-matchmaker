import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http-service/http.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends HttpService {
  protected users = [];
  constructor(
    protected http: HttpClient,
    protected snackBar,
    ) {
      super(http, snackBar);
    }

  public register(
    email: string,
    firstName: string,
    lastname: string,
    age: number,
    // location: number? zip code?,
    password: string,
    confirmPassword: string
    ):  Observable<User>{
      if (password !== confirmPassword) {
        return; // TODO call error
      } else {
        const listOfUsers = this.http.post('/api/getUsers', {},
         this.httpOptions).pipe(map((resp: any) => {
            if (resp) {
              resp.forEach(user => { // TODO make sure I'm using forEach right
                this.users.push(user);
              });
              for (let i = 0; i < this.users.length; ++i ) {
                if (this.users[i].email ===  email) {
                  // display an error
                } else {
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
              }
            }
          return null;
        })).pipe(catchError(err => this.handleError(err)));
      }
        // Call to backend to return all users in an array
        // Iterate through users, compare user[i].email
        // If a hit, return error
        // Else, create a user, return some kind of success
  }
}
