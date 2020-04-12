import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http-service/http.service';
import { EditProfileService } from 'src/app/shared/services/edit-profile-service/edit-profile.service';
import { MockUsers } from 'src/app/shared/mocks/mock-users';
import { EditProfilePage } from 'src/app/pages/edit-profile-page/edit-profile-page.component';

describe('EditProfilePage (Spectator Tests)', () => {
  let editProfileService;
  let spectator: Spectator<EditProfilePage>;
  const user1 = MockUsers.prototype.getUser1();
  const createComponent = createComponentFactory({
    component: EditProfilePage,
    componentMocks: [EditProfileService, HttpService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.component.currentUser = user1;
    spyOn(spectator.component, 'goHome');
    editProfileService = spectator.get<EditProfileService>(EditProfileService, true);
  });

  it('Should call the register service to register and then handle a successful registration', () => {
    editProfileService.saveProfile.andReturn(of('MockResponse'));

    spectator.component.submitChanges(user1);

    expect(editProfileService.updateUser).toHaveBeenCalledWith('MockResponse');
    expect(spectator.component.goHome).toHaveBeenCalled();
  });
});
