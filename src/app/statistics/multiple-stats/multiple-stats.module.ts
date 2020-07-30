import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipleStatsPageRoutingModule } from './multiple-stats-routing.module';

import { MultipleStatsPage } from './multiple-stats.page';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultipleStatsPageRoutingModule,
    ChartsModule,
  ],
  declarations: [],
  entryComponents: [MultipleStatsPage]
})
export class MultipleStatsPageModule {}
