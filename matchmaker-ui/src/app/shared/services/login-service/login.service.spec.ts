import { TestBed, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// TODO structure the mock data to match how the response from the server is going to be

const auth = {
  accessToken: '12345',
  userId: 1,
  user_type: 2
};

let detail;
let handleErrorSpy;

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        LoginService,
      ],
      schemas: []
    });
  });

  it('should return a regular user', inject(
    [HttpTestingController, LoginService], (httpMock: HttpTestingController, loginService: LoginService) => {
      detail = {
        email: 'bob@students.kennesaw.edu',
        first_name: 'Bob',
        last_name: 'Johnson',
        age: 26,
        is_active: true,
        user_type: 2,
        id: 1
    };
      loginService.login('bob@students.kennesaw.edu', 'alligator3').subscribe(data => {
        expect(data.email).toEqual(detail.email);
        expect(data.firstName).toEqual(detail.first_name);
        expect(data.lastName).toEqual(detail.last_name);
        expect(data.age).toEqual(detail.age);
        expect(data.isActive).toEqual(true);
        expect(data.id).toEqual(detail.id);
        expect(data.type).toEqual('regular');
      });
      const mockReq = httpMock.expectOne('/api/authorizeUser');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush({
        auth, detail
      });
      httpMock.verify();
    }));

  it('should return an admin', inject(
    [HttpTestingController, LoginService], (httpMock: HttpTestingController, loginService: LoginService) => {
      detail = {
        email: 'slipman@students.kennesaw.edu',
        first_name: 'Sloan',
        last_name: 'Lipman',
        age: 26,
        is_active: true,
        user_type: 1,
        id: 2
    };
      loginService.login('slipman@students.kennesaw.edu', 'myPassword').subscribe(data => {
        expect(data.email).toEqual(detail.email);
        expect(data.firstName).toEqual(detail.first_name);
        expect(data.lastName).toEqual(detail.last_name);
        expect(data.age).toEqual(detail.age);
        expect(data.isActive).toEqual(true);
        expect(data.id).toEqual(detail.id);
        expect(data.type).toEqual('admin');
      });
      const mockReq = httpMock.expectOne('/api/authorizeUser');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush({
        auth, detail
      });
      httpMock.verify();
    }));

  it('should return an error for an inactive user', inject(
    [HttpTestingController, LoginService], (httpMock: HttpTestingController, loginService: LoginService) => {
    handleErrorSpy = spyOn<any>(loginService, 'handleError').and.callThrough();
    detail = {
      email: 'rob@students.kennesaw.edu',
      first_name: 'Rob',
      last_name: 'Bert',
      age: 19,
      is_active: false,
      user_type: 2,
      id: 3
    };
    loginService.login('rob@students.kennesaw.edu', 'myPassword').subscribe(data => {
      expect(handleErrorSpy).toHaveBeenCalled();
    });
    const mockReq = httpMock.expectOne('/api/authorizeUser');
    expect(mockReq.request.method).toEqual('POST');
    mockReq.flush({
      auth, detail
    });
    httpMock.verify();
  }));
});
