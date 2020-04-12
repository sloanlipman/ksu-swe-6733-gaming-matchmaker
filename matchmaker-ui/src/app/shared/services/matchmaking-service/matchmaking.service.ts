import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class MatchmakingService extends HttpService {
  constructor(protected http: HttpClient, public snackBar: MatSnackBar) {
    super(http, snackBar);
  }

  interests: string[] = [];
  genres: string[] = [];
  times: string[] = [];
  priorities: string[] = [];
  matches: any[] = [];
  currentUser: User;

  public getMatches(id: number) {
    return this.get('/api/engine/match/' + id)
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
