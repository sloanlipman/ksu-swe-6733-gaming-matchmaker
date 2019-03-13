import { NgModule } from '@angular/core';
import { EditProfilePageComponent } from './edit-profile-page.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


@NgModule({
  declarations: [
    EditProfilePageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EditProfilePageComponent
      }
    ])
  ],
  exports: [
    EditProfilePageComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule{}
