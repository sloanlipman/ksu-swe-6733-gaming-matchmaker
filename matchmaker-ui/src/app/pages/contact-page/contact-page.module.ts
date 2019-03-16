import { NgModule } from '@angular/core';
import { ContactPage } from './contact-page.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


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
export class HomePageModule{}
