import { Component, OnInit } from '@angular/core';
import { ProfessorDashboardComponent } from '../professor-dashboard/professor-dashboard.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfessorDashboardComponent, AdminDashboardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentUserRole: number = 0;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    this.currentUserRole = currentUser?.UserRoleId || 0
  }
}
