import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    AvatarModule,
    TooltipModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() sidebarVisible: boolean = true;
  @Output() sidebarVisibleChange = new EventEmitter<boolean>();

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;  // Toggle the sidebar visibility
    this.sidebarVisibleChange.emit(this.sidebarVisible);  // Emit the change to the parent component
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
