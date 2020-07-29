import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

import { StatisticsPage } from './statistics.page';
import { ChartsModule } from 'ng2-charts';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { SingleStatsPageModule } from './single-stats/single-stats.module';
import { MultipleStatsPageModule } from './multiple-stats/multiple-stats.module';
import { SingleStatsPage } from './single-stats/single-stats.page';
import { MultipleStatsPage } from './multiple-stats/multiple-stats.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    StatisticsPageRoutingModule,
    SingleStatsPageModule,
    MultipleStatsPageModule,
    SuperTabsModule
  ],
  declarations: [StatisticsPage, SingleStatsPage, MultipleStatsPage],
  entryComponents: [StatisticsPage]
})
export class StatisticsPageModule {}

