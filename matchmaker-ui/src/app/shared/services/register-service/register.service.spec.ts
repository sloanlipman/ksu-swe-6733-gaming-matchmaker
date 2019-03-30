import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { RegisterService } from './register.service';

const auth = {}; // add proper auth header here
let httpMock;
let newUser;
const existingUsers = {}; // TODO add an array of existing users

describe('RegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      RegisterService
    ],
  }));

beforeEach(() => {
  httpMock = TestBed.get(HttpTestingController);
});

afterEach(() => {
  httpMock.verify();
});

  it('should be created', () => {
    const service: RegisterService = TestBed.get(RegisterService);
    expect(service).toBeTruthy();
  });

  it('should register a new user and mark that user as logged in', inject(

    [RegisterService], (service: RegisterService) => {
      newUser = {
        email: 'slipman@students.kennesaw.edu',
        firstName: 'Sloan',
        lastName: 'Lipman',
        age: 26,
        password: 'alligator3',
        confirmPassword: 'alligator3' // TODO add more fields?
      };
      service.register(
        newUser.email,
        newUser.firstName,
        newUser.lastName,
        newUser.age,
        // newUser.location,
        newUser.password,
        newUser.confirmPassword
      ).subscribe(data => {
        /** Expect successful creation of user
            * Email not in use
            * Passwords match
        */

        // Expect user to be current user
        /** Expect current user's:
         * id to not be null
         * first name = input's FN
         * last name = input's
         * emails to equal
         * passwords to equal? Maybe not that one because wouldn't be storing the password in local storage
         * ages to equal
         * locations to equal
         * to be active
         * user type to be regular
         */
        // Expect navigate to edit profile page
        // Expect anything else?
      });
      const req = httpMock.expectOne('/api/register'); // add API call here
      req.flush({
        auth, newUser
      });
  }));

  it('should return an error if the passwords do not match', inject(

    [RegisterService], (service: RegisterService) => {
      newUser = {
        email: 'slipman@students.kennesaw.edu',
        first_name: 'Sloan',
        last_name: 'Lipman',
        age: 26,
        password: 'password',
        confirmPassword: 'differentPassword' // TODO add more fields?
      };
      service.register(
        newUser.email,
        newUser.firstName,
        newUser.lastName,
        newUser.age,
        // newUser.location,
        newUser.password,
        newUser.confirmPassword
      ).subscribe(error => { // TODO subscribe to error?
        // Expect error here because passwords do not match
      });
      const req = httpMock.expectOne('/api/register');
      req.flush({
        auth, newUser
      });
  }));

  it('should return an error if the email is already in use', inject(
    [RegisterService], (service: RegisterService) => {
      newUser = {
        email: 'existingUser@gmail.com',
        first_name: 'Sloan',
        last_name: 'Lipman',
        age: 26,
        password: 'password',
        confirmPassword: 'password' // TODO add more fields?
      };
      service.register(
        newUser.email,
        newUser.firstName,
        newUser.lastName,
        newUser.age,
        // newUser.location,
        newUser.password,
        newUser.confirmPassword
      ).subscribe(error => { // TODO subscribe to error
        // Expect error here because email is in use
      });
      const req = httpMock.expectOne('/api/register');
      req.flush({
        auth, newUser
      });

  }));
});
