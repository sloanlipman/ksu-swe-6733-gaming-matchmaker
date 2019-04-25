import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';
import { Observable, of, defer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

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
    })
  };

  public typeToString(type: number): string {
    if (type === 1) {
      return 'admin';
    } else if (type === 2) {
        return 'regular';
    }
  }

  public stringToType(type: string): number {
    if (type === 'admin') {
      return 1;
    } else if (type === 'regular') {
      return 2;
    }
  }

  protected post(url: string, body: any, options?: any) {
    url = this.apiUrl + url;
    return defer(() => {
      return this.http.post(url, body, options);
    });
  }

  protected put(url: string, body: any, options?: any) {
    url = this.apiUrl + url;
    return defer(() => {
      return this.http.put(url, body, options);
    });
  }

  protected get(url: string, options?: any) {
    url = this.apiUrl + url;
    return defer(() => {
      return this.http.get(url, options);
    });
  }

  public getUser(id: any): Observable<User> {
    return this.get('/api/profile/get/' + id).pipe(map((resp: any) => {
      if (resp) {
        return this.updateUser(resp);
      }
    })).pipe(catchError(err => this.handleError(err)));
  }

  public updateUser(user: any, accessToken?: any) {
    user.priorities = []; // TODO delete
    this.currUser = new User({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      location: user.location,
      isActive: user.is_active,
      type: this.typeToString(user.user_type),
      interests: user.interests,
      genres: user.genres,
      times: user.times,
      priorities: user.priorities
    });
    localStorage.setItem('user', JSON.stringify(this.currUser));
    if (accessToken) {
      localStorage.setItem('auth', accessToken);
    }
    return this.currUser;
  }

  public getAllInterests(): Observable<any>{
      return this.get('/api/interests/getall').pipe(map((resp: any) => {
        if (resp){
          return resp;
        }
    })).pipe(catchError(err => this.handleError(err)));
  }

  public getAllGenres(): Observable<any> { // TODO confirm this is the right endpoint
    return this.get('/api/gameGenres').pipe(map((resp: any) => {
      if (resp){
        return resp;
      }
  })).pipe(catchError(err => this.handleError(err)));
}

  public getAllTimes(): Observable<any> {
    return this.get('/api/playTimes').pipe(map((resp: any) => { // TODO add the endpoint
      if (resp){
        console.log('TIMES RESP', resp);
        return resp;
      }
    })).pipe(catchError(err => this.handleError(err)));
  }

  public getAllPriorities(): Observable<any>{
    return this.get('/api/priority/getall').pipe(map((resp: any) => {
      if (resp){
        return resp;
      }
  })).pipe(catchError(err => this.handleError(err)));
}



  public logout() {
    this.currUser = null;
    this.authToken = null;
    localStorage.clear();
  }

  public handleError(err?: any): Observable<any> {
    let errorMessage = 'Oops! Something went wrong. Please try again!';
    if (err.error && err.statusText !== 'Unknown Error') {
      errorMessage = err.error;
    } else if (!err.error) {
      errorMessage = err;
    }
     /* if (err.error.message) { // Login error
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
      errorMessage = err; */

    this.snackBar.open(errorMessage, '', { // Display error to the user
      duration: 3000,
      verticalPosition: 'top',
    });
    console.log('Error is', err); // original error message, using this to define new errors to display
    return of(null);
  }
}
