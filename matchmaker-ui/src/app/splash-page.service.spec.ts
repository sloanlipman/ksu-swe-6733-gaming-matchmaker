import { TestBed } from '@angular/core/testing';

import { SplashPageService } from './splash-page.service';

describe('SplashPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SplashPageService = TestBed.get(SplashPageService);
    expect(service).toBeTruthy();
  });
});
