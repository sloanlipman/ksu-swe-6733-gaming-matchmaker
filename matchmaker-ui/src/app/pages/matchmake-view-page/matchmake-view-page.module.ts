import { NgModule } from '@angular/core';
import { MatchmakeViewPageComponent } from './matchmake-view-page.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';


@NgModule({
  declarations: [
    MatchmakeViewPageComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MatchmakeViewPageComponent
      }
    ])
  ],
  exports: [
    MatchmakeViewPageComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPageModule{}
