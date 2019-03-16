import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPage } from './pages/register-page/register-page.component';
import { LandingPage } from './pages/landing-page/landing-page.component';
import { EditProfilePage } from './pages/edit-profile-page/edit-profile-page.component';
import { MatchmakeViewPage } from './pages/matchmake-view-page/matchmake-view-page.component';
import { AboutPage } from './pages/about/about.component';
import { ContactPage } from './pages/contact-page/contact-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
  {
    path: 'landing-page',
    component: LandingPage
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'edit-profile',
    component: EditProfilePage
  },
  {
    path: 'home',
    component: HomePage
    },
  {
    path: 'matchmaking',
    component: MatchmakeViewPage
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: 'contact-page',
    component: ContactPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
