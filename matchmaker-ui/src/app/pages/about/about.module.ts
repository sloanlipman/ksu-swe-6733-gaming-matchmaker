import { NgModule } from '@angular/core';
import { AboutPage } from './about.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


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
