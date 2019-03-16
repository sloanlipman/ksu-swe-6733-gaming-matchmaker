import { NgModule } from '@angular/core';
import { LandingPage } from './landing-page.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


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
export class LoginPageModule{}
