import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditProfilePage } from './edit-profile-page.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CommonModule } from '@angular/common';
import { EditProfileService } from 'src/app/shared/services/edit-profile-service/edit-profile.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditProfilePage
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditProfilePage
      }
    ])
  ],
  exports: [
    EditProfilePage
  ],
  providers: [EditProfileService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditProfilePageModule{}
