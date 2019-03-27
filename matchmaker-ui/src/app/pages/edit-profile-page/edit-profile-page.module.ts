import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditProfilePage } from './edit-profile-page.component';

@NgModule({
  declarations: [
    EditProfilePage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EditProfilePage
      }
    ])
  ],
  exports: [
    EditProfilePage
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditProfilePageModule{}
