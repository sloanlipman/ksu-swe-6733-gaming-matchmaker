import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactPage } from './contact-page.component';

@NgModule({
  declarations: [
    ContactPage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ContactPage
      }
    ])
  ],
  exports: [
    ContactPage
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactPageModule{}
