import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { SuperTabsModule} from '@ionic-super-tabs/angular'
import { HomePageModule } from '../home/home.module';
import { StatisticsPageModule } from '../statistics/statistics.module';
import { MembersPageModule } from '../members/members.module';
import { ProfilePageModule } from '../profile/profile.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    SuperTabsModule,
    HomePageModule,
    StatisticsPageModule,
    MembersPageModule,
    ProfilePageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsPageModule {}
