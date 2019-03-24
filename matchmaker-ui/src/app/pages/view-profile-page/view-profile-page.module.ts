import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewProfilePage } from './view-profile-page.component';

@NgModule({
  declarations: [
    ViewProfilePage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ViewProfilePage
      }
    ])
  ],
  exports: [
    ViewProfilePage
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewProfilePageModule{}