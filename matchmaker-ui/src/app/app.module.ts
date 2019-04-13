import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';

import { LoadingIndicator } from './shared/components/loading-indicator/loading-indicator.component';
import { AboutPage } from './shared/components/about/about.component';
import { ContactPage } from './shared/components/contact-page/contact-page.component';
import { HttpService } from './shared/services/http-service/http.service';

@NgModule({
  declarations: [
    AppComponent,
    LoadingIndicator,
    AboutPage,
    ContactPage
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent,
    LoadingIndicator,
    AboutPage,
    ContactPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
