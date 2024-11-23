import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarContentComponent } from '../sidebar-content/sidebar-content.component';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [CommonModule, SidebarContentComponent, SidebarModule],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.css'
})
export class SidebarMobileComponent {
  @Input() sidebarVisible: boolean = true;
  @Input() isMobileSidebarOpen: boolean = false;
  @Output() mobileSidebarOpenChange = new EventEmitter<boolean>();
}
