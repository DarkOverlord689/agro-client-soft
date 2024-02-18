import { MainRedirectGuard } from './guards/main-redirect.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { MainComponent } from './module/main/main.component';
import { LoginComponent } from './module/auth/login/login.component';
import { RedirectGuard } from './guards/redirect.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    loadChildren: () =>
      import('./module/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [MainRedirectGuard],
  },
  {
    path: 'main',
    component: MainComponent,
    loadChildren: () =>
      import('./module/main/main.module').then((m) => m.MainModule),
    canActivate: [RedirectGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
