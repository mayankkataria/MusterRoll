import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleStatsPage } from './multiple-stats.page';

const routes: Routes = [
  {
    path: '',
    component: MultipleStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleStatsPageRoutingModule {}
