import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ChartsModule } from 'ng2-charts';
// import { FlexLayoutModule } from '@angular/flex-layout'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // FlexLayoutModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ChartsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
