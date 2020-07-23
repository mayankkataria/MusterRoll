import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AdminGuard } from '../guards/admin.guard';
import { EmployeeGuard } from '../guards/employee.guard';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        // canActivate: [RoleGuard]
      },
      {
        path: 'members',
        loadChildren: () => import('../members/members.module').then(m => m.MembersPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'others-profile/:uid',
        loadChildren: () => import('../others-profile/others-profile.module').then( m => m.OthersProfilePageModule)
      },
      {
        path: 'employee-home',
        loadChildren: () => import('../employee-home/employee-home.module').then( m => m.EmployeeHomePageModule)
      },
      {
        path: 'admin-home',
        loadChildren: () => import('../admin-home/admin-home.module').then( m => m.AdminHomePageModule),
        // canActivate: [AdminGuard]
      },
      {
        path: 'statistics',
        loadChildren: () => import('../statistics/statistics.module').then( m => m.StatisticsPageModule),
      },
      {
        path: 'clock-in',
        loadChildren: () => import('../clock-in/clock-in.module').then( m => m.ClockInPageModule),
        canActivate: [EmployeeGuard]
      },
      {
        path: 'attendance-log',
        loadChildren: () => import('../attendance-log/attendance-log.module').then( m => m.AttendanceLogPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
