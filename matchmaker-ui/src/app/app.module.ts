import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { HomePage } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { EditProfilePage } from './pages/edit-profile-page/edit-profile-page.component';
import { LandingPage } from './pages/landing-page/landing-page.component';
import { MatchmakeViewPage } from './pages/matchmake-view-page/matchmake-view-page.component';
import { RegisterPage } from './pages/register-page/register-page.component';
import { PlayerCardComponent } from './shared/components/player-card/player-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginPageComponent,
    EditProfilePage,
    LandingPage,
    MatchmakeViewPage,
    RegisterPage,
    PlayerCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
