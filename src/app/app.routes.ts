import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';

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
        data: { roles: ['professor'] }
      },
      {
        path: 'courses',
        component: CoursesListComponent,
        canActivate: [AuthGuard],
        data: { roles: ['professor', 'admin'] }
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
      },
      // { path: '**', redirectTo: '' }
    ]
  },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }