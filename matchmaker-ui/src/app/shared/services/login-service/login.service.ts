import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authToken: string = null;
  public currUser: User = null;

  constructor(
    protected http: HttpClient,
    private snackBar: MatSnackBar,
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
        console.log(resp.detail.id);
        if (resp.detail.is_active) {
          this.authToken = resp.auth.accessToken;
          this.currUser = new User({
            id: resp.detail.id,
            email: resp.detail.email,
            firstName: resp.detail.first_name,
            lastName: resp.detail.last_name,
            age: resp.detail.age,
            active: resp.detail.is_active,
            type: this.typeToString(resp.detail.user_type)
          });

          localStorage.setItem('access-token', this.authToken);
          localStorage.setItem('user', JSON.stringify(this.currUser));
          return Object.assign({}, this.currUser);
        }
      } else {
          return null;
        }
      })).pipe(catchError(err => this.handleError(err)));
    }
    public logout() {
      this.currUser = null;
      this.authToken = null;
      localStorage.clear();
    }
    private handleError(err: any): Observable<User> {
      console.log('authentication failed: err =', err);
      if (err.error.message.includes('UserRec not found') || err.error.message.includes('Password not match')) {
        this.snackBar.open('Invalid credentials. Please try again.', '', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
      return of(null);
  }
}
