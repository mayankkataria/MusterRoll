import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeHomePageRoutingModule } from './employee-home-routing.module';

import { EmployeeHomePage } from './employee-home.page';
import { FenceHistoryPageModule } from '../fence-history/fence-history.module';
import { ClockInPageModule } from '../clock-in/clock-in.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeHomePageRoutingModule,
    FenceHistoryPageModule,
    ClockInPageModule
  ],
  exports: [
    EmployeeHomePage
  ],
  declarations: [EmployeeHomePage]
})
export class EmployeeHomePageModule {}
