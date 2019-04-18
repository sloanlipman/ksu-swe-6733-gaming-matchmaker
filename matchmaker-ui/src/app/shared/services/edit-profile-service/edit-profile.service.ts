import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../http-service/http.service';


@Injectable({
  providedIn: 'root'
})
export class EditProfileService extends HttpService {

constructor(
  protected http: HttpClient,
  public snackBar: MatSnackBar,
  ) {
    super(http, snackBar);
  }

  public saveProfile(id: any, request: any): Observable<any> {
    return this.post('/api/profile/save/' + id, request, this.httpOptions).pipe(map((resp: any) => {
      if (resp) {
        this.handleError('Profile Updated Successfully');
            // Not an error, but we can reuse the same logic to display 'Profile Updated Successfully'

        return resp;
      }
    })).pipe(catchError(err => this.handleError(err)));
  }
}
