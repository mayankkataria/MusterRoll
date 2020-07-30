import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { AttendanceLogPage } from '../attendance-log/attendance-log.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    // children: [
    //   {
    //     path: 'attendance-log',
    //     loadChildren: () => import('../attendance-log/attendance-log.module').then(m => m.AttendanceLogPageModule)
    //     // component: AttendanceLogPage
    //   },
    // ]
  },
  // {
  //   path: 'attendance-log',
  //   loadChildren: () => import('../attendance-log/attendance-log.module').then(m => m.AttendanceLogPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
