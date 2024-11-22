import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../types/user';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private authChecked = false;

  constructor(
    private apiService: ApiService, 
    private cookieService: CookieService,
    private router: Router
  ) { }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  authHeader(): { [key: string]: string } {
    const token = this.cookieService.get('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async checkAuth(): Promise<User | null> {
    const token = this.cookieService.get('token');

    if(!token)
      return null

    if (!this.authChecked) {
      try {
        const response = await this.apiService.get('/auth/check_auth', this.authHeader());
        const user = response?.data?.user as User;
        this.currentUserSubject.next(user);
        this.authChecked = true;
        return user;
      } catch (error) {
        this.currentUserSubject.next(null);
        this.authChecked = true;
        return null;
      }
    }
    return this.currentUserValue;
  }

  async login(username: string, password: string) {
    const body = {
      UserNameOrEmail: username,
      Password: password,
    };

    const response = await this.apiService.post('/auth/login', body);
    const user = response?.data?.user as User
    const newToken = response?.data?.token as string

    this.cookieService.set('token', newToken, 30);
    this.currentUserSubject.next(user);
    return user
  }

  async logout() {
    await this.apiService.post('/auth/logout', {}, this.authHeader());
    this.cookieService.delete('token');
    this.currentUserSubject.next(null);
    this.authChecked = false;
    this.router.navigate(['/login']);
  }

  // updateCurrentUser(user: any) {
  //   localStorage.setItem('currentUser', JSON.stringify(user));
  //   this.currentUser = user;
  // }
}
