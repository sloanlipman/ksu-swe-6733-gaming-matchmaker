import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LandingPage } from './landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoadingIndicator } from 'src/app/shared/components/loading-indicator/loading-indicator.component';
@NgModule({
  declarations: [
    LandingPage,
  ],
  imports: [
    AppMaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingPage
      }
    ])
  ],
  exports: [
    LandingPage
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: []
})
export class LandingPageModule{}
