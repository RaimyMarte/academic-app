import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { StatsService } from '../../../../services/stats/stats.service';

interface SystemStats {
  label: string;
  value: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  systemStats: SystemStats[] = []

  constructor(private statsService: StatsService) { }

  async ngOnInit() {
    const statsValues = await this.statsService.getAdminStats();

    this.systemStats = [
      {
        label: 'Total Students',
        value: statsValues.totalStudents,
        icon: 'pi pi-users',
        color: 'text-blue-600'
      },
      {
        label: 'Total Professors',
        value: statsValues.totalProfessors,
        icon: 'pi pi-user',
        color: 'text-green-600'
      },
      {
        label: 'Subjects',
        value: statsValues.totalSubjects,
        icon: 'pi pi-book',
        color: 'text-purple-600'
      },
      {
        label: 'Total Users',
        value: statsValues.totalUsers,
        icon: 'pi pi-users',
        color: 'text-orange-600'
      }
    ];
  }
}
