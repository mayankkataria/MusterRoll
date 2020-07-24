import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsPage } from './statistics.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/statistics/single-stats',
        pathMatch: 'full'
      },
      {
        path: 'single-stats',
        loadChildren: () => import('./single-stats/single-stats.module').then( m => m.SingleStatsPageModule)
      },
      {
        path: 'multiple-stats',
        loadChildren: () => import('./multiple-stats/multiple-stats.module').then( m => m.MultipleStatsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/statistics/single-stats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsPageRoutingModule {}
