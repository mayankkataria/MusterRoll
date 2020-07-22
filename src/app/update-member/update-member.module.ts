import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMemberPageRoutingModule } from './update-member-routing.module';

import { UpdateMemberPage } from './update-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMemberPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateMemberPage]
})
export class UpdateMemberPageModule {}
