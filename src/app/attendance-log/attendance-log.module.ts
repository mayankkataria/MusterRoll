import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceLogPageRoutingModule } from './attendance-log-routing.module';

import { AttendanceLogPage } from './attendance-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceLogPageRoutingModule
  ],
  declarations: [AttendanceLogPage]
})
export class AttendanceLogPageModule {}
