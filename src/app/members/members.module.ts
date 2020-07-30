import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembersPageRoutingModule } from './members-routing.module';

import { MembersPage } from './members.page';
import { FilterModalPageModule } from '../filter-modal/filter-modal.module';
import { OthersProfilePageModule } from '../others-profile/others-profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembersPageRoutingModule,
    FilterModalPageModule,
    OthersProfilePageModule
  ],
  declarations: [MembersPage],
  entryComponents: [MembersPage]
})
export class MembersPageModule {}
