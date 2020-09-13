import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return environment.accessEnabled;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
