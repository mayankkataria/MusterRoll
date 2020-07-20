import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'geofence',
    loadChildren: () => import('./geofence/geofence.module').then(m => m.GeofencePageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'add-face',
    loadChildren: () => import('./add-face/add-face.module').then(m => m.AddFacePageModule),
    canActivate: [EmployeeGuard]
  },
  {
    path: 'add-fingerprint',
    loadChildren: () => import('./add-fingerprint/add-fingerprint.module').then(m => m.AddFingerprintPageModule),
    canActivate: [EmployeeGuard]
  },
  {
    path: 'leave',
    loadChildren: () => import('./leave/leave.module').then(m => m.LeavePageModule),
    canActivate: [EmployeeGuard]
  },
  {
    path: 'verify-face',
    loadChildren: () => import('./verify-face/verify-face.module').then(m => m.VerifyFacePageModule),
    canActivate: [EmployeeGuard]
  },
  {
    path: 'verify-fingerprint',
    loadChildren: () => import('./verify-fingerprint/verify-fingerprint.module').then(m => m.VerifyFingerprintPageModule),
    canActivate: [EmployeeGuard]
  },
  {
    path: 'take-attendance',
    loadChildren: () => import('./take-attendance/take-attendance.module').then(m => m.TakeAttendancePageModule),
    canActivate: [AuthGuard]
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
    loadChildren: () => import('./add-employee/add-employee.module').then( m => m.AddEmployeePageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
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
    path: 'fence-history',
    loadChildren: () => import('./fence-history/fence-history.module').then( m => m.FenceHistoryPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
