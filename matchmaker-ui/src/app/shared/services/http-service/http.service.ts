import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';

@Injectable()
export class HttpService {
  protected authToken: string = null;
  public currUser: User;

  constructor(
    protected http: HttpClient,
    protected snackBar: MatSnackBar,
    ) {}

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control': 'Access-Control-Allow-Headers'
    })
  };

  protected typeToString(type: number): string {
    if (type === 1) {
      return 'admin';
    } else if (type === 2) {
        return 'regular';
    }
  }

  public logout() {
    this.currUser = null;
    this.authToken = null;
    localStorage.clear();
  }

  protected handleError(err: any): Observable<any> {
    let errorMessage;
    if (err.error) {
      if (err.error.message) { // Login error
        if (err.error.message.includes('UserRec not found') || err.error.message.includes('Password not match')) {
         errorMessage = 'Invalid credentials. Please try again.';
        }
      } else if (err.error === 'inactive account') {
          errorMessage = 'Your account is inactive';
      } else {
          errorMessage = 'Cannot connect to server. Please try again later.';
      }
    }
    this.snackBar.open(errorMessage, '', { // Display error to the user
      duration: 3000,
      verticalPosition: 'top',
    });
    return of(null);
}
}