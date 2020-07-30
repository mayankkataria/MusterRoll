import { Component, OnInit, ViewChild } from '@angular/core';
import { Label, Color, SingleDataSet } from 'ng2-charts';
// import * as Chart from 'chart.js';


import { Chart } from 'chart.js';
import { DataSet } from '../models/dataset.model';
import { StatService } from '../services/stat.service';
import { Observable } from 'rxjs';
import { DateTimeService } from '../services/date-time.service';
import { SingleStatsPage } from './single-stats/single-stats.page';
import { MultipleStatsPage } from './multiple-stats/multiple-stats.page';
import { Router } from '@angular/router';
import { NavController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage {

  singleStats = SingleStatsPage;
  multiStats = MultipleStatsPage;

  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  constructor() { }
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
}
