import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { NonAuthGuard } from './non-auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { StudentsListComponent } from './pages/student/student-list/student-list.component';
import { StudentSubjectPickListComponent } from './pages/subjects/student-subject-pick-list/student-subject-pick-list.component';
import { StudentsGradesComponent } from './pages/subjects/students-grades/students-grades.component';
import { SubjectAttendanceComponent } from './pages/subjects/subject-attendance/subject-attendance.component';
import { SubjectsListComponent } from './pages/subjects/subjects-list/subjects-list.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { HomeComponent } from './pages/home/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'subjects',
        component: SubjectsListComponent,
        canActivate: [AuthGuard],
        // data: { roles: ['professor', 'admin'] }
      },
      {
        path: 'subjects/enroll/:subjectId', 
        component: StudentSubjectPickListComponent,
        canActivate: [AuthGuard],
        // data: { roles: ['professor', 'admin'] }
      },     
      {
        path: 'subjects/attendance/:subjectId', 
        component: SubjectAttendanceComponent,
        canActivate: [AuthGuard],
        // data: { roles: ['professor', 'admin'] }
      },    
      {
        path: 'subjects/grades/:subjectId', 
        component: StudentsGradesComponent,
        canActivate: [AuthGuard],
        // data: { roles: ['professor', 'admin'] }
      },    
      {
        path: 'students',
        component: StudentsListComponent,
        canActivate: [AuthGuard],
        // data: { roles: ['professor', 'admin'] }
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard],
        // data: { roles: ['admin'] }
      },
      // { path: '**', redirectTo: '' }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }