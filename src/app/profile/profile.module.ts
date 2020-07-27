import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { AttendanceLogPageModule } from '../attendance-log/attendance-log.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    AttendanceLogPageModule
  ],
  declarations: [ProfilePage],
  entryComponents: [ProfilePage]
})
export class ProfilePageModule {}
