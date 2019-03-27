import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RegisterPage } from './register-page.component';
import { RegisterService } from 'src/app/shared/services/register-service/register.service';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RegisterPage
      }
    ])
  ],
  exports: [
    RegisterPage
  ],
  providers: [
    RegisterService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterPageModule{}
