import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatchmakeViewPage } from './matchmake-view-page.component';

@NgModule({
  declarations: [
    MatchmakeViewPage
  ],
  imports: [
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
export class LoginPageModule{}
