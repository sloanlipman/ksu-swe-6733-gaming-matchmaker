import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutPage } from './about.component';

@NgModule({
  declarations: [
    AboutPage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AboutPage
      }
    ])
  ],
  exports: [
    AboutPage
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule{}
