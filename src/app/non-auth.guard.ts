import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  async canActivate() {
    const token = this.cookieService.get('token');
  
    if (!token)
      return true

    const currentUser = await this.authService.checkAuth();

    if (currentUser) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}