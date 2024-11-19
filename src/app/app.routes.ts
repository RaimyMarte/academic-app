import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

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