import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { MatchmakeViewPageComponent } from './matchmake-view-page/matchmake-view-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    EditProfilePageComponent,
    SplashPageComponent,
    MatchmakeViewPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule, // Any angular materials we use need to be imported here!
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
