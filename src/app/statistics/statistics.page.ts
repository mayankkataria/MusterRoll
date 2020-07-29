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
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage {

  singleStats = SingleStatsPage;
  multiStats = MultipleStatsPage;

  constructor(
    private statService: StatService,
    private dateTimeService: DateTimeService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  // ngOnInit() {
  //   this.label = 'presentees';
  //   this.stats$ = this.statService.getStats$();
  // }

  // superTabClick(ev) {
  //   console.log('st clicked: ', ev);
  //   // this.router.navigate(['tabs/statistics/single-stats']);
  //   this.navCtrl.navigateBack('tabs/statistics/single-stats');
  // }
}
