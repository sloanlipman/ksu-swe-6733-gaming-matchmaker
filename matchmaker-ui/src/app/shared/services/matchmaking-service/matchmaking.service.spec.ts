import { TestBed } from '@angular/core/testing';

import { MatchmakingService } from './matchmaking.service';

describe('MatchmakingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchmakingService = TestBed.get(MatchmakingService);
    expect(service).toBeTruthy();
  });
});
