import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';

import { AboutPage } from './shared/components/about/about.component';
import { ContactPage } from './shared/components/contact-page/contact-page.component';
import { EditProfilePage } from './pages/edit-profile-page/edit-profile-page.component';
import { HomePage } from './pages/home-page/home-page.component';
import { LandingPage } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatchmakeViewPage } from './pages/matchmake-view-page/matchmake-view-page.component';
import { RegisterPage } from './pages/register-page/register-page.component';
import { ViewProfilePage } from './pages/view-profile-page/view-profile-page.component';

import { LoginService } from './shared/services/login-service/login.service';
import { LoadingIndicator } from './shared/components/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    AboutPage,
    AppComponent,
    ContactPage,
    EditProfilePage,
    HomePage,
    LandingPage,
    LoadingIndicator,
    LoginPageComponent,
    MatchmakeViewPage,
    RegisterPage,
    ViewProfilePage,
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoadingIndicator],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
