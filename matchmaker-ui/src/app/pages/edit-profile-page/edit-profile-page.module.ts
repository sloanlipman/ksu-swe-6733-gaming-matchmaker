import { NgModule } from '@angular/core';
import { EditProfilePage } from './edit-profile-page.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


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
export class HomePageModule{}
