import { TestBed, inject } from '@angular/core/testing';
import { EditProfileService } from './edit-profile.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


describe('EditProfileService', () => {
  let httpMock;
  let handleErrorSpy;
  const apiUrl = environment.API_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        EditProfileService,
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

  it('should be created', () => {
    const service: EditProfileService = TestBed.get(EditProfileService); // Get from TestBed instead of inject for reasons I'm not sure of
    expect(service).toBeTruthy();
  });

  it('should save profile', inject(
    [EditProfileService], (service: EditProfileService) => {
      const req = {}; // TODO could add more data here
      handleErrorSpy = spyOn(service, 'handleError').and.stub();

      service.saveProfile(req).subscribe(data => {
        expect(data).toEqual(req);
        expect(handleErrorSpy).toHaveBeenCalled();
      });

      const mockReq = httpMock.expectOne(apiUrl + '/api/users/update/');
      expect(mockReq.request.method).toEqual('PUT');
      mockReq.flush(
        req
      );
    }));
});
