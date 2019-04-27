import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatchmakeViewPage } from './matchmake-view-page.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ProfileCard } from 'src/app/shared/components/profile-card/profile-card.component';
import { ProfileCardModule } from 'src/app/shared/components/profile-card/profile-card.module';

@NgModule({
  declarations: [
    MatchmakeViewPage,
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ProfileCardModule,
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
  providers: [
    MatchmakingService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MatchmakeViewPageModule{}
