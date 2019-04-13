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

    public getAllInterests(): Observable<any>{
        return this.get('/api/interests/getall').pipe(map((resp: any) => {
            if (resp){
                return resp;
            }
        })).pipe(catchError(err => this.handleError(err)));
    }
}
