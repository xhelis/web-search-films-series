import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/homecomponent';
import { AuthGuard } from './service/auth.guard';
import { LoginGuard } from './service/login.guard';
import { FavouritesComponent } from './favourites/favourites.component';
import { SignoutComponent } from './signout/signout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signout', component: SignoutComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
