import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FenceHistoryPage } from './fence-history.page';

const routes: Routes = [
  {
    path: '',
    component: FenceHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FenceHistoryPageRoutingModule {}
