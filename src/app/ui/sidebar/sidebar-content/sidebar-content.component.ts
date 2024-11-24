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
import { AuthService } from '../../../../services/auth/auth.service';
import { User } from '../../../../types/user';

@Component({
  selector: 'sidebar-content',
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
  templateUrl: './sidebar-content.component.html',
  styleUrl: './sidebar-content.component.css'
})
export class SidebarContentComponent {
  @Input() sidebarVisible: boolean = true;
  
  menuItems: MenuItem[] = [];
  currentUser: User | null = null;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
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
        label: 'Professor Dashboard',
        icon: 'pi pi-users',
        routerLink: '/professor',
        visible: this.currentUser?.UserRoleId === 2
      },
      {
        label: 'Subjects',
        icon: 'pi pi-users',
        routerLink: '/subjects',
        visible: this.currentUser?.UserRoleId === 2 || this.currentUser?.UserRoleId === 1
      },
      {
        label: 'Students',
        icon: 'pi pi-users',
        routerLink: '/students',
        visible: this.currentUser?.UserRoleId === 1
      },
      {
        label: 'Users',
        icon: 'pi pi-users',
        routerLink: '/users',
        visible: this.currentUser?.UserRoleId === 1
      }
    ];
  }
}