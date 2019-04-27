import { TestBed } from '@angular/core/testing';

import { MatchmakingService } from './matchmaking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MatchmakingServiceService', () => {
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
});
