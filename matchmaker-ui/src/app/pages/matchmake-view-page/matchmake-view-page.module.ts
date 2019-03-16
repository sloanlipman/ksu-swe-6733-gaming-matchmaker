import { NgModule } from '@angular/core';
import { MatchmakeViewPage } from './matchmake-view-page.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


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
