import { TestBed, inject } from '@angular/core/testing';

import { MatchmakingService } from './matchmaking.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';


describe('MatchmakingServiceService', () => {
  const apiUrl = environment.API_URL;
  let httpMock;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        MatchmakingService,
      ],
      schemas: []
    });
  });


  it('should be created', () => {
    const service: MatchmakingService = TestBed.get(MatchmakingService);
    expect(service).toBeTruthy();
  });

  describe('serviceTest', () => {
    beforeEach(() => {
      httpMock = TestBed.get(HttpTestingController);
    });
    afterEach(() => {
      httpMock.verify();
    });
it ('should get matches', inject(
    [MatchmakingService], (matchmakingService: MatchmakingService) => {
    matchmakingService.getMatches(5).subscribe(data => {});
    const mockReq = httpMock.expectOne(apiUrl + '/api/engine/match/5');
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush({});
   }));
  });
});
