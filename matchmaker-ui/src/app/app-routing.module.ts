import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './shared/components/about/about.component';
import { ContactPage } from './shared/components/contact-page/contact-page.component';
import { EditProfilePage } from './pages/edit-profile-page/edit-profile-page.component';
import { HomePage } from './pages/home-page/home-page.component';
import { LandingPage } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatchmakeViewPage } from './pages/matchmake-view-page/matchmake-view-page.component';
import { RegisterPage } from './pages/register-page/register-page.component';
import { ViewProfilePage } from './pages/view-profile-page/view-profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },
    {
    path: 'about',
    component: AboutPage
    },
    {
      path: 'contact-page',
      component: ContactPage
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
      path: 'landing-page',
      component: LandingPage
    },
    {
      path: 'login',
      component: LoginPageComponent
    },
    {
      path: 'matchmaking',
      component: MatchmakeViewPage
    },
    {
      path: 'register',
      component: RegisterPage
    },
    {
      path: 'view-profile/:id',
      component: ViewProfilePage
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
