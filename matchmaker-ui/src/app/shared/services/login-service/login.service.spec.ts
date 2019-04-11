import { TestBed, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const auth = {
  accessToken: '12345',
  userId: 1,
  user_type: 2
};

let detail;
let err;
let handleErrorSpy;
let httpMock;
const apiUrl = environment.API_URL;

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

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return a regular user', inject(
    [LoginService], (loginService: LoginService) => {
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
      const mockReq = httpMock.expectOne(apiUrl + '/api/authorizeUser');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush({
        auth, detail
      });
      loginService.snackBar.dismiss(); // Dismiss at the end to unblock the view on Karma
    }));

  it('should return an admin', inject(
    [LoginService], (loginService: LoginService) => {
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
      const mockReq = httpMock.expectOne(apiUrl + '/api/authorizeUser');
      expect(mockReq.request.method).toEqual('POST');
      mockReq.flush({
        auth, detail
      });
      loginService.snackBar.dismiss(); // Dismiss at the end to unblock the view on Karma
    }));

  it('should return an error for an inactive user', inject(
    [LoginService], (loginService: LoginService) => {
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
    const mockReq = httpMock.expectOne(apiUrl + '/api/authorizeUser');
    expect(mockReq.request.method).toEqual('POST');
    mockReq.flush({
      auth, detail
    });
    loginService.snackBar.dismiss(); // Dismiss at the end to unblock the view on Karma
  }));

  it('should return an error for nonexistent users', inject(
    [LoginService], (loginService: LoginService) => {
    handleErrorSpy = spyOn<any>(loginService, 'handleError').and.callThrough();
    err = {
        message: 'UserRec not found'
    };
    loginService.login('rob@students.kennesaw.edu', 'myPassword').subscribe(
      data => {},
      (error: HttpErrorResponse) => {
    });
    const mockReq = httpMock.expectOne(apiUrl + '/api/authorizeUser');
    const mockError = new ErrorEvent('UserRec not found error', err);
    mockReq.error(mockError);
    expect(handleErrorSpy).toHaveBeenCalled();
    loginService.snackBar.dismiss(); // Dismiss at the end to unblock the view on Karma
  }));

  it('should return an error for an incorrect password', inject(
    [LoginService], (loginService: LoginService) => {
    handleErrorSpy = spyOn<any>(loginService, 'handleError').and.callThrough();
    err = {
        message: 'Password not match'
    };
    loginService.login('rob@students.kennesaw.edu', 'myPassword').subscribe(
      data => {},
      (error: HttpErrorResponse) => {});
    const mockReq = httpMock.expectOne(apiUrl + '/api/authorizeUser');
    const mockError = new ErrorEvent('Password not match error', err);
    mockReq.error(mockError);
    expect(handleErrorSpy).toHaveBeenCalled();
    loginService.snackBar.dismiss(); // Dismiss at the end to unblock the view on Karma
  }));

  it('should return a generic server error for any other error', inject(
    [LoginService], (loginService: LoginService) => {
    handleErrorSpy = spyOn<any>(loginService, 'handleError').and.callThrough();
    err = {
        message: ''
    };
    loginService.login('rob@students.kennesaw.edu', 'myPassword').subscribe(
      data => {},
      (error: HttpErrorResponse) => {});
    const mockReq = httpMock.expectOne(apiUrl + '/api/authorizeUser');
    const mockError = new ErrorEvent('Generic server error', err); // TODO I don't think this is working
    mockReq.error(mockError);
    expect(handleErrorSpy).toHaveBeenCalled();
    loginService.snackBar.dismiss(); // Dismiss at the end to unblock the view on Karma
  }));
});
