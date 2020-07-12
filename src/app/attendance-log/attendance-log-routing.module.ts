import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceLogPage } from './attendance-log.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceLogPageRoutingModule {}
