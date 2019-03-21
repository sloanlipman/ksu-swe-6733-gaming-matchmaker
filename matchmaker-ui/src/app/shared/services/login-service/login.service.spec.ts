import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { User } from '../../models/user';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

// TODO structure the mock data to match how the response from the server is going to be
const mockData = {
    // TODO assign user.id
    email: 'bob@students.kennesaw.edu',
    first_name: 'Bob',
    last_name: 'Johnson',
    password: 'alligator3',
    age: 26,
    active: 'active',
    type: 2,
    id: 'test'
  };
  console.log(mockData);

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService
      ],
      schemas: []
    });

  });

  afterEach(() => {
 //   httpTestingController.verify();
  });

  it(
    'should get users',
    inject(
      [HttpTestingController, LoginService],
      (
        httpMock: HttpTestingController,
        loginService: LoginService
      ) => {
        loginService['login']('bob@students.kennesaw.edu', 'alligator3').subscribe(() => {
          console.log('first name is ' + loginService['currUser'].firstName);
          expect(loginService['currUser'].email).toEqual('bob@students.kennesaw.edu'); // TODO update with more tests if needed
        });
        const mockReq = httpMock.expectOne('/api/authorizeUser'); // TODO update this when the link changes in the sevice
        mockReq.flush({
         data: mockData
        });
        httpMock.verify();
      }));
  // TODO add test cases to handle service errors and the like
});
