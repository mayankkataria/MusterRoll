import { Component, OnInit, ViewChild } from '@angular/core';
import { Label, Color, SingleDataSet } from 'ng2-charts';
// import * as Chart from 'chart.js';


import { Chart } from 'chart.js';
import { DataSet } from '../models/dataset.model';
import { StatService } from '../services/stat.service';
import { Observable } from 'rxjs';
import { DateTimeService } from '../services/date-time.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage {

  // @ViewChild('barChart', { static: true }) barChart;

  // bars: any;
  // colorArray: any;
  // dataSet: any;
  // absentees = { label: 'Absentees', data: [], backgroundColor: 'red' };
  // lateComers = { label: 'Late Comers', data: [], backgroundColor: 'blue' };
  // presentees = { label: 'Presentees', data: [], backgroundColor: 'green' };
  // earlyLeavers = { label: 'Early Leavers', data: [], backgroundColor: 'orange' };
  // label: string;
  // fromDate: string = new Date(2020, 6, 1, 24, 0).toISOString();
  // fromDateObj: Date = new Date(2020, 6, 1);
  // fromDatePicker: any;
  // toDate: string = new Date(2020, 6, 1, 24, 0).toISOString();
  // toDateObj: Date = new Date();
  // toDatePicker: any;
  // stats$: Observable<any[]>;
  // dateRange: Date[];
  // dateStringLabels: string[] = [];
  // singleDate = false;

  // constructor(
  //   private statService: StatService,
  //   private dateTimeService: DateTimeService
  // ) { }

  // ngOnInit() {
  //   this.label = 'presentees';
  //   this.stats$ = this.statService.getStats$();
  // }

  // ionViewDidEnter() {
  //   this.getStatsRange();
  // }

  // async getStatsRange() {
  //   console.log('from date: ', this.fromDate);
  //   console.log('to date: ', this.toDate);
  //   if (this.fromDate === this.toDate) {
  //     this.singleDate = true;
  //     console.log('single date: ', this.singleDate);
  //     return;
  //   }
  //   console.log('get stats range');
  //   this.absentees.data = [];
  //   this.presentees.data = [];
  //   this.earlyLeavers.data = [];
  //   this.lateComers.data = [];
  //   this.dateStringLabels = [];
  //   this.getLabel();
  //   this.stats$ = this.statService.getStatsRange$(new Date(this.fromDate), new Date(this.toDate));
  //   this.stats$.subscribe(rangeData => {
  //     console.log('range data: ', rangeData);
  //     rangeData.forEach(data => {
  //       const date = this.dateTimeService.getDate(data.date.toDate());
  //       const month = this.dateTimeService.getMonth(data.date.toDate());
  //       const year = this.dateTimeService.getFullYear(data.date.toDate());
  //       const dateString = `${date}/${month}/${year}`;
  //       this.dateStringLabels.push(dateString);
  //       this.absentees.data.push(data.absentees);
  //       this.earlyLeavers.data.push(data.earlyLeavers);
  //       this.lateComers.data.push(data.lateComers);
  //       this.presentees.data.push(data.presentees);
  //       this.createBarChart();
  //     });
  //   });
  // }

  // async getLabel() {
  //   console.log('get label');
  //   if (this.label === 'absentees') {
  //     this.dataSet = Object.assign({}, this.absentees);
  //   } else if (this.label === 'lateComers') {
  //     this.dataSet = Object.assign({}, this.lateComers);
  //   } else if (this.label === 'presentees') {
  //     this.dataSet = Object.assign({}, this.presentees);
  //   } else {
  //     this.dataSet = Object.assign({}, this.earlyLeavers);
  //   }
  // }

  // async getFromDate() {
  //   console.log('get from date');
  //   this.fromDateObj = new Date(this.fromDate);
  // }

  // async getToDate() {
  //   console.log('get to date');
  //   this.toDateObj = new Date(this.toDate);
  // }

  // async createBarChart() {
  //   console.log('create bar chart');
  //   console.log('date string labels: ', this.dateStringLabels);
  //   console.log('date set: ', this.dataSet);
  //   this.bars = new Chart(this.barChart.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels: this.dateStringLabels,
  //       datasets: [this.dataSet]
  //     },
  //     options: {
  //       // responsive: true,
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     }
  //   });
  // }

  // canvasClicked() {
  //   console.log('canvas clicked');
  // }
}
