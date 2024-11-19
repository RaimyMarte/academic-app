import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUser: any;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
  }

  public get currentUserValue(): any {
    return this.currentUser;
  }

  login(username: string, password: string) {
    // Mock login logic
    const user = { id: 1, username, role: this.getUserRole(username) };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
    return user;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  updateCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  private getUserRole(username: string): string {
    if (username.includes('admin')) return 'admin';
    if (username.includes('professor')) return 'professor';
    return 'student';
  }
}
