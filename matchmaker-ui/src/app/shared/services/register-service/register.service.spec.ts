import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { RegisterService } from './register.service';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const auth = {};
let httpMock;
let detail;
let handleErrorSpy;
let err;
let expectedError;

describe('RegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      BrowserAnimationsModule,
      MatSnackBarModule
    ],
    providers: [
      RegisterService
    ],
  }));

beforeEach(() => {
  httpMock = TestBed.get(HttpTestingController);
});

  it('should be created', () => {
    const service: RegisterService = TestBed.get(RegisterService); // Get from TestBed instead of inject for reasons I'm not sure of
    expect(service).toBeTruthy();
  });

  it('should register a new user and mark that user as logged in', inject(

    [RegisterService], (service: RegisterService) => {
      detail = {
        email: 'slipman@students.kennesaw.edu',
        firstName: 'Sloan',
        lastName: 'Lipman',
        age: '26',
        zip: '30075',
        password: 'alligator3',
        confirmPassword: 'alligator3' // TODO add more fields?
      };
      service.register(
        detail.email,
        detail.firstName,
        detail.lastName,
        detail.age,
        detail.location,
        detail.password,
        detail.confirmPassword
      ).subscribe(data => {
          expect(data.detail.firstName).toEqual(detail.firstName);
          expect(data.detail.lastName).toEqual(detail.lastName);
          expect(data.detail.email).toEqual(detail.email);
          expect(data.detail.age).toEqual(detail.age);
          expect(data.detail.location).toEqual(detail.location);
      });
      const req = httpMock.expectOne('/api/register'); // add API call here
      req.flush({
        auth, detail
      });
      service.snackBar.dismiss(); // Dismiss at the end to unblock the view on Karma
                                  // TODO these aren't really working
  }));

  it('should return an error if the passwords do not match', inject(
    [RegisterService], (service: RegisterService) => {
      handleErrorSpy = spyOn(service, 'handleError').and.callThrough();
      detail = {
        email: 'slipman@students.kennesaw.edu',
        firstName: 'Sloan',
        lastName: 'Lipman',
        age: '26',
        zip: '30075',
        password: 'password',
        confirmPassword: 'differentPassword'
      };
      service.register(
        detail.email,
        detail.firstName,
        detail.lastName,
        detail.age,
        detail.location,
        detail.password,
        detail.confirmPassword
      );
        expect(handleErrorSpy).toHaveBeenCalledWith('Passwords do not match');
        service.snackBar.dismiss(); // Dismiss at the end to unblock the view on Karma
  }));

  it('should return an error if the email is already in use', inject(
    [RegisterService], (service: RegisterService) => {
      handleErrorSpy = spyOn<any>(service, 'handleError').and.callThrough();
      expectedError = {
        error: {
          message: 'Email address already in use. Please try again with a different email.'
        }
      };
    err = {
        message: ''
    };
      detail = {
        email: 'existingUser@gmail.com',
        first_name: 'Sloan',
        last_name: 'Lipman',
        age: 26,
        password: 'password',
        confirmPassword: 'password',
        zip: '30075'
      };
      service.register(
        detail.email,
        detail.firstName,
        detail.lastName,
        detail.age,
        detail.zip,
        detail.password,
        detail.confirmPassword
      ).subscribe(
        data => {},
        (error: HttpErrorResponse)  => {
          console.log('ERROR IS', error);
          expect(handleErrorSpy).not.toHaveBeenCalledWith(expectedError);
      });
      const mockReq = httpMock.expectOne('/api/register');
      const mockError = new ErrorEvent('', expectedError); // TODO I don't think this is getting hit properly
      mockReq.error(mockError);
  }));
});
