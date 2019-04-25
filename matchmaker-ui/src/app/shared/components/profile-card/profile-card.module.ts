import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileCard } from './profile-card.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProfileCard
  ],
  imports: [
    AppMaterialModule,
    CommonModule
  ],
  exports: [
    ProfileCard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ProfileCardModule{}
