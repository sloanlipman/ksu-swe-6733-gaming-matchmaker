import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { MatchmakeViewPageComponent } from './matchmake-view-page/matchmake-view-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/splash-page', pathMatch: 'full' },
  {
    path: 'splash-page',
    component: SplashPageComponent
  },
  {
    path: 'login-page',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: SignUpPageComponent
  },
  {
    path: 'edit-profile',
    component: EditProfilePageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
    },
  {
    path: 'matchmaking',
    component: MatchmakeViewPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
