import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutPage } from './about.component';
import { AppMaterialModule } from '../../../app-material.module';


@NgModule({
  declarations: [
    AboutPage
  ],
  imports: [
    AppMaterialModule,
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
export class AboutPageModule {}
