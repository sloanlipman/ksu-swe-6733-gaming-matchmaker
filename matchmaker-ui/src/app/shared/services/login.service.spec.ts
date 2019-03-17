import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
 // const service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      schemas: []
    });
  //  service = TestBed.get(LoginService);
  });

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
