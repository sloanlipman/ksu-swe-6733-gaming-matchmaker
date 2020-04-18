import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';

import { AppComponent } from '../app/app.component';
import { MockUsers } from '../app/shared/mocks/mock-users';
import { User } from '../app/shared/models/user';
import { HttpService } from '../app/shared/services/http-service/http.service';
import { MatchmakingService } from '../app/shared/services/matchmaking-service/matchmaking.service';

fdescribe('AppComponent (Spectator Tests)', () => {
  let httpService;
  let matchmakingService;
  let spectator: Spectator<AppComponent>;
  const user1 = MockUsers.prototype.getUser1();
  const createComponent = createComponentFactory({
    component: AppComponent,
    componentMocks: [HttpService, MatchmakingService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.component.currentUser = user1;
    httpService = spectator.get<HttpService>(HttpService, true);
    matchmakingService = spectator.get<MatchmakingService>(MatchmakingService, true);
  });

  describe('getting lists', () => {
    it('should get all interests', fakeAsync(() => {
      const interests = ['Hiking', 'Fishing'];
      httpService.getAllInterests.andReturn(of(interests));

      spectator.component.getAllInterests();
      tick();

      expect(matchmakingService.interests).toEqual(interests);
    }));

    it('should get all genres', fakeAsync(() => {
      const genres = ['RPGs', 'FPS', 'RTS'];
      httpService.getAllGenres.andReturn(of(genres));

      spectator.component.getAllGenres();
      tick();

      expect(matchmakingService.genres).toEqual(genres);
    }));

    it('should get all times', fakeAsync(() => {
      const times = ['Afternoon', 'Morning', 'Evening', 'Late Night'];
      httpService.getAllTimes.andReturn(of(times));

      spectator.component.getAllTimes();
      tick();

      expect(matchmakingService.times).toEqual(times);
    }));

    it('should get all priorities', fakeAsync(() => {
      const priorities = ['Location', 'Interests', 'Active Time', 'Genres'];
      httpService.getAllPriorities.andReturn(of(priorities));

      spectator.component.getAllPriorities();
      tick();

      expect(matchmakingService.priorities).toEqual(priorities);
    }));

    it('should get all matches', fakeAsync(() => {
      matchmakingService.currentUser = user1;
      matchmakingService.matches = [];
      const matches = [user1, user1, user1];
      const expectedMatches = [new User(user1), new User(user1), new User(user1)];
      matchmakingService.getMatches.andReturn(of(matches));

      spectator.component.getMatches();

      tick();

      expect(matchmakingService.matches).toEqual(expectedMatches);
    }));

    it('should already have matches', fakeAsync(() => {
      matchmakingService.getMatches.andReturn(of());

      matchmakingService.matches = [user1];
      spectator.component.getMatches();

      tick();

      expect(matchmakingService.getMatches).not.toHaveBeenCalled();
      expect(matchmakingService.matches).toEqual([user1]);
    }));
  });
});
