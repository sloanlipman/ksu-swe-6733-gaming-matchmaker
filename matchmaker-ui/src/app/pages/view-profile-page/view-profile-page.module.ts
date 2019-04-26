import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewProfilePage } from './view-profile-page.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { ProfileCardModule } from 'src/app/shared/components/profile-card/profile-card.module';

@NgModule({
  declarations: [
    ViewProfilePage
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ProfileCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewProfilePage
      }
    ])
  ],
  exports: [
    ViewProfilePage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewProfilePageModule{}
