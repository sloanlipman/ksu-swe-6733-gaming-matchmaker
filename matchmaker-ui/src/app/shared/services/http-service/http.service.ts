import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';
import { Observable, of, defer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {
  protected authToken: string = null;
  public currUser: User;
  protected apiUrl = environment.API_URL;

  constructor(
    protected http: HttpClient,
    public snackBar: MatSnackBar,
    ) {}

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control': 'Access-Control-Allow-Headers',
      'HttpStatus': 'ok'
    })
  };

  protected typeToString(type: number): string {
    if (type === 1) {
      return 'admin';
    } else if (type === 2) {
        return 'regular';
    }
  }

  protected post(url: string, body: any, options?: any) {
    url = this.apiUrl + url;
    return defer(() => {
      return this.http.post(url, body, options);
    });
  }

  public logout() {
    this.currUser = null;
    this.authToken = null;
    localStorage.clear();
    console.log('logged out');
  }

  public handleError(err: any): Observable<any> {
    let errorMessage = 'UNDEFINED ERROR MESSAGE';
    if (err.error) {
      if (err.error.message) { // Login error
        if (err.error.message.includes('UserRec not found') || err.error.message.includes('Password not match')) {
         errorMessage = 'Invalid credentials. Please try again.';
        } else if (err.error.message.includes('Location not found for Zip Code') ||
                  err.error.message.includes('String index out of range')) {
            errorMessage = 'Invalid ZIP code.';
        } else if (err.error.message === 'email already exists') {
            errorMessage = 'Email address already in use. Please try again with a different email.';
        } else if (err.error.message.includes('Required age')) {
            errorMessage = 'Invalid age. Please enter an age of 4 years or more'; // TODO make sure this error works with the latest code
        }
      } else if (err.error === 'inactive account') {
          errorMessage = 'Your account is inactive';
      } else {
          errorMessage = 'Cannot connect to server. Please try again later.';
      }
    } else {
      errorMessage = err;
    }
    this.snackBar.open(errorMessage, '', { // Display error to the user
      duration: 3000,
      verticalPosition: 'top',
    });
    console.log(err); // original error message, using this to define new errors to display
    return of(null);
  }
}
