import { NgModule } from '@angular/core';
import { SignUpPageComponent } from './sign-up-page.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


@NgModule({
  declarations: [
    SignUpPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SignUpPageComponent
      }
    ])
  ],
  exports: [
    SignUpPageComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule{}
