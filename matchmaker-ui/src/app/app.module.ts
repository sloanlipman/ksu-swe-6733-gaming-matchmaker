import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';

import { AboutPage } from './pages/about/about.component';
import { ContactPage } from './pages/contact-page/contact-page.component';
import { EditProfilePage } from './pages/edit-profile-page/edit-profile-page.component';
import { HomePage } from './pages/home-page/home-page.component';
import { LandingPage } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatchmakeViewPage } from './pages/matchmake-view-page/matchmake-view-page.component';
import { PlayerCardComponent } from './shared/components/player-card/player-card.component';
import { RegisterPage } from './pages/register-page/register-page.component';


@NgModule({
  declarations: [
    AboutPage,
    AppComponent,
    ContactPage,
    EditProfilePage,
    HomePage,
    LandingPage,
    LoginPageComponent,
    MatchmakeViewPage,
     PlayerCardComponent,
     RegisterPage,
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
