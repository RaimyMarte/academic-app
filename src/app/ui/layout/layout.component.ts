import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppSidebar } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

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
  styleUrl: './layout.component.css'
})

export class LayoutComponent {
  sidebarVisible: boolean = true;
}
