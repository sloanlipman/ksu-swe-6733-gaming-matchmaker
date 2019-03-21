import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { LoginService } from 'src/app/shared/services/login-service/login.service';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginPageComponent
      }
    ])
  ],
  exports: [
    LoginPageComponent
  ],
  providers: [ LoginService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule{}
