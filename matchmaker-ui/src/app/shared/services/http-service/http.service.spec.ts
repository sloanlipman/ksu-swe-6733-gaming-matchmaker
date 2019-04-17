import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockUsers } from '../../mock-users';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

describe('HttpService', () => {
  let unitConvertTest;
  let httpMock;
  let updateUserSpy;
  const mockUsers = new MockUsers();
  const user1 = mockUsers.getUser1();
  const user2 = new User(mockUsers.getUser2());
  const user3 = mockUsers.getUser3();
  const apiUrl = environment.API_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        HttpService
      ],
      schemas: []
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
  });



  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });

  describe('non-service tests', () => {
    let service;
    beforeEach(() => {
       service = TestBed.get(HttpService);
    });

    it('should return admin', () => {
      unitConvertTest = service.typeToString(1);
      expect(unitConvertTest).toEqual('admin');
    });

    it('should return regular', () => {
      unitConvertTest = service.typeToString(2);
      expect(unitConvertTest).toEqual('regular');
    });

    it('should return 1', () => {
      unitConvertTest = service.stringToType('admin');
      expect(unitConvertTest).toEqual(1);
    });

    it('should return 2', () => {
      unitConvertTest = service.stringToType('regular');
      expect(unitConvertTest).toEqual(2);
    });

    it('should store user and access token', () => {
      service.updateUser(user3, '12345');
      const user = (JSON.parse(localStorage.getItem('user')));
      const auth = localStorage.getItem('auth');
      expect(user.id).toEqual(user3.id);
      expect(user.email).toEqual(user3.email);
      expect(user.firstName).toEqual(user3.first_name);
      expect(user.lastName).toEqual(user3.last_name);
      expect(user.age).toEqual(user3.age);
      expect(user.location).toEqual(user3.location);
      expect(user.type).toEqual('admin');
      expect(user.isActive).toEqual(user3.is_active);
      expect(user.interests).toEqual(user3.interests);
      expect(auth).toEqual('12345');
    });
  });

  describe('Service tests', () => {
    afterEach(() => {
      httpMock.verify();
     });

    it('should get user', inject(
      [HttpService], (httpService: HttpService) => {
        updateUserSpy = spyOn(httpService, 'updateUser').and.stub();

        httpService.getUser(user1.id).subscribe(data => {
        });
        const mockReq = httpMock.expectOne(apiUrl + '/api/profile/get/' + user1.id);
        expect(mockReq.request.method).toEqual('GET');
        mockReq.flush({
          user1
        });
    }));

    // it('should return an error for getUser') //TODO write this case

    it('should get all interests' , inject(
      [HttpService], (httpService: HttpService) => {
        const interests = ['Hiking', 'Yoga', 'Jogging', 'Biking'];

        httpService.getAllInterests().subscribe(data => {
          expect(data).toEqual({interests});
          // expect(data.data.length).toEqual(3);
        });
        const mockReq = httpMock.expectOne(apiUrl + '/api/interests/getall');
        expect(mockReq.request.method).toEqual('GET');
        mockReq.flush({
          interests
        });
    }));
  });
});
