import { NgModule } from '@angular/core';
import { SplashPageComponent } from './splash-page.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


@NgModule({
  declarations: [
    SplashPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SplashPageComponent
      }
    ])
  ],
  exports: [
    SplashPageComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule{}
