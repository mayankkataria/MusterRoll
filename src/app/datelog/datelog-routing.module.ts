import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatelogPage } from './datelog.page';

const routes: Routes = [
  {
    path: '',
    component: DatelogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatelogPageRoutingModule {}
