import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OthersProfilePageRoutingModule } from './others-profile-routing.module';

import { OthersProfilePage } from './others-profile.page';
import { UpdateMemberPageModule } from '../update-member/update-member.module';
import { AttendanceLogPageModule } from '../attendance-log/attendance-log.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OthersProfilePageRoutingModule,
    UpdateMemberPageModule,
    AttendanceLogPageModule
  ],
  declarations: [OthersProfilePage]
})
export class OthersProfilePageModule {}
