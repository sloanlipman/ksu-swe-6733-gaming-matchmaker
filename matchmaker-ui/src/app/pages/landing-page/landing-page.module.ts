import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LandingPage } from './landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    LandingPage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LandingPage
      }
    ])
  ],
  exports: [
    LandingPage
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingPageModule{}
