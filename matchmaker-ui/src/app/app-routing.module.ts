import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  /* {
  path: 'about',
  loadChildren: './shared/components/about/about.module#AboutPageModule'
  }, */
  /* {
    path: 'contact-page',
    loadChildren: './shared/components/contact-page/contact-page.module#ContactPageModule'
  }, */
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile-page/edit-profile-page.module').then((m) => m.EditProfilePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home-page/home-page.module').then((m) => m.HomePageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./pages/landing-page/landing-page.module').then((m) => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule)
  },
  {
    path: 'matchmaking',
    loadChildren: () => import('./pages/matchmake-view-page/matchmake-view-page.module').then((m) => m.MatchmakeViewPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register-page/register-page.module').then((m) => m.RegisterPageModule)
  },
  {
    path: 'view-profile/:id',
    loadChildren: () => import('./pages/view-profile-page/view-profile-page.module').then((m) => m.ViewProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
