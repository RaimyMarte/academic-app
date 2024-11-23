import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AppSidebar } from '../sidebar/app-sidebar/app-sidebar.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    AppSidebar,
    RippleModule,
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  sidebarVisible: boolean = true;
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    // Use BreakpointObserver to detect mobile
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result:any) => {
    
      this.isMobile = result.matches;
      if (this.isMobile) {
        this.sidebarVisible = false; // Close sidebar on mobile
      } else {
        this.sidebarVisible = true; // Show sidebar on larger screens
      }
    });
  }
}
