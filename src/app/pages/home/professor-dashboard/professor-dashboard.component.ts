import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { StatsService } from '../../../../services/stats/stats.service';

interface SubjectStats {
  name: string;
  totalStudents: number;
  enrolledStudents: number;
  averageGrade: number;
}

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [ButtonModule, CommonModule, AvatarModule, TimelineModule, TagModule],
  templateUrl: './professor-dashboard.component.html',
  styleUrl: './professor-dashboard.component.css'
})
export class ProfessorDashboardComponent implements OnInit {
  subjectStats: SubjectStats[] = [];

  constructor(private statsService: StatsService) { }

  async ngOnInit() {
    const statsValues = await this.statsService.getProfessorStats();
console.log(statsValues)
    this.subjectStats = statsValues?.map((subject: any) => ({
      name: subject?.name,
      enrolledStudents: subject?.enrolledStudents,
      averageGrade: subject?.averageGrade
    }))

    //   {
    //     label: 'Total Students',
    //     value: statsValues.totalStudents,
    //     icon: 'pi pi-users',
    //     color: 'text-blue-600'
    //   },
    //   {
    //     label: 'Total Professors',
    //     value: statsValues.totalProfessors,
    //     icon: 'pi pi-user',
    //     color: 'text-green-600'
    //   },
    //   {
    //     label: 'Subjects',
    //     value: statsValues.totalSubjects,
    //     icon: 'pi pi-book',
    //     color: 'text-purple-600'
    //   },
    //   {
    //     label: 'Total Users',
    //     value: statsValues.totalUsers,
    //     icon: 'pi pi-users',
    //     color: 'text-orange-600'
    //   }
    // ];
  }

  getTagSeverity(grade: number): 'success' | 'info' | 'warning' | 'danger' {
    if (grade >= 90) return 'success';
    if (grade >= 80) return 'info';
    if (grade >= 70) return 'warning';
    return 'danger';
  }

  getGradeLiteral(grade: number): string {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    return 'F';
  }
}