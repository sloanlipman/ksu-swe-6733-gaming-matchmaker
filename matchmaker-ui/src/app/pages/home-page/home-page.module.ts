import { NgModule } from '@angular/core';
import { HomePage } from './home-page.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  exports: [
    HomePage
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule{}
