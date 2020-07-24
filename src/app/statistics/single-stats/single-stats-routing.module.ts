import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleStatsPage } from './single-stats.page';

const routes: Routes = [
  {
    path: '',
    component: SingleStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleStatsPageRoutingModule {}
