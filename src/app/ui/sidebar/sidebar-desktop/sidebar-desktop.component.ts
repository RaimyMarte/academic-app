import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarContentComponent } from '../sidebar-content/sidebar-content.component';

@Component({
  selector: 'app-sidebar-desktop',
  standalone: true,
  imports: [CommonModule, SidebarContentComponent],
  templateUrl: './sidebar-desktop.component.html',
  styleUrl: './sidebar-desktop.component.css'
})
export class SidebarDesktopComponent {
  @Input() sidebarVisible: boolean = true;
  @Input() isMobileSidebarOpen: boolean = false;
  @Output() mobileSidebarOpenChange = new EventEmitter<boolean>();
}
