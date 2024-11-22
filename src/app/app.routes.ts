import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { ProfessorDashboardComponent } from './pages/professor-dashboard/professor-dashboard.component';
import { SubjectsListComponent } from './pages/subjects/subjects-list/subjects-list.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { NonAuthGuard } from './non-auth.guard';
import { StudentListComponent } from './pages/student/student-list/student-list.component';

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
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'professor',
        component: ProfessorDashboardComponent,
        canActivate: [AuthGuard],
        // data: { roles: ['professor'] }
      },
      {
        path: 'subjects',
        component: SubjectsListComponent,
        canActivate: [AuthGuard],
        // data: { roles: ['professor', 'admin'] }
      },
      {
        path: 'students',
        component: StudentListComponent,
        canActivate: [AuthGuard],
        // data: { roles: ['professor', 'admin'] }
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
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