import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
   
    if (currentUser && currentUser.id) { // Ensure the user object has valid data
      // Check if route is restricted by role
      if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
        // Role not authorised, redirect to home page
        this.router.navigate(['/']);
        return false;
      }
  
      // Authorised
      return true;
    }
  
    // Not logged in, redirect to login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
}