import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
     path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'geofence',
    loadChildren: () => import('./geofence/geofence.module').then(m => m.GeofencePageModule)
  },
  {
    path: 'add-face',
    loadChildren: () => import('./add-face/add-face.module').then(m => m.AddFacePageModule)
  },
  {
    path: 'add-fingerprint',
    loadChildren: () => import('./add-fingerprint/add-fingerprint.module').then(m => m.AddFingerprintPageModule)
  },
  {
    path: 'leave',
    loadChildren: () => import('./leave/leave.module').then(m => m.LeavePageModule)
  },
  {
    path: 'verify-face',
    loadChildren: () => import('./verify-face/verify-face.module').then(m => m.VerifyFacePageModule)
  },
  {
    path: 'verify-fingerprint',
    loadChildren: () => import('./verify-fingerprint/verify-fingerprint.module').then(m => m.VerifyFingerprintPageModule)
  },
  {
    path: 'take-attendance',
    loadChildren: () => import('./take-attendance/take-attendance.module').then(m => m.TakeAttendancePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-employee',
    loadChildren: () => import('./add-employee/add-employee.module').then( m => m.AddEmployeePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./admin-home/admin-home.module').then( m => m.AdminHomePageModule)
  },
  {
    path: 'employee-home',
    loadChildren: () => import('./employee-home/employee-home.module').then( m => m.EmployeeHomePageModule)
  },
  {
    path: 'clock-in',
    loadChildren: () => import('./clock-in/clock-in.module').then( m => m.ClockInPageModule)
  },
  {
    path: 'chat-room',
    loadChildren: () => import('./chat-room/chat-room.module').then( m => m.ChatRoomPageModule)
  },
  {
    path: 'filter-modal',
    loadChildren: () => import('./filter-modal/filter-modal.module').then( m => m.FilterModalPageModule)
  },
  {
    path: 'others-profile/:uid',
    loadChildren: () => import('./others-profile/others-profile.module').then( m => m.OthersProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
