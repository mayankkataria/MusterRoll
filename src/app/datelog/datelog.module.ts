import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatelogPageRoutingModule } from './datelog-routing.module';

import { DatelogPage } from './datelog.page';
import { FenceHistoryPageModule } from '../fence-history/fence-history.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatelogPageRoutingModule,
    FenceHistoryPageModule
  ],
  declarations: [DatelogPage]
})
export class DatelogPageModule {}
