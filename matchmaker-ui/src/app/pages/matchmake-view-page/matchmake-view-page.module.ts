import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatchmakeViewPage } from './matchmake-view-page.component';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  declarations: [
    MatchmakeViewPage
  ],
  imports: [
    AppMaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: MatchmakeViewPage
      }
    ])
  ],
  exports: [
    MatchmakeViewPage
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MatchmakeViewPageModule{}
