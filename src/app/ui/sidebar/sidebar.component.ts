import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    MenuModule,
    DividerModule,
    AvatarModule,
    RippleModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class AppSidebar {
  @Input() sidebarVisible: boolean = true;

  menuItems: MenuItem[] = [];

  constructor(public authService: AuthService) {
    this.initializeMenuItems();
  }

  private initializeMenuItems() {
    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
        visible: true
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/profile',
        visible: true
      },
      {
        label: 'Student Dashboard',
        icon: 'pi pi-book',
        routerLink: '/student',
        visible: this.authService.currentUserValue?.role === 'student'
      },
      {
        label: 'Professor Dashboard',
        icon: 'pi pi-users',
        routerLink: '/professor',
        visible: this.authService.currentUserValue?.role === 'professor'
      },
      {
        label: 'Admin Dashboard',
        icon: 'pi pi-cog',
        routerLink: '/admin',
        visible: this.authService.currentUserValue?.role === 'admin'
      }
    ];
  }
}