import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate() {
    const currentUser = await this.authService.checkAuth();
    console.log('second')

    if (currentUser) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}