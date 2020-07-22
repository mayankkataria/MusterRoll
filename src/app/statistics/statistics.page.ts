import { Component, OnInit, ViewChild } from '@angular/core';
import { Label, Color, SingleDataSet } from 'ng2-charts';
// import * as Chart from 'chart.js';


import { Chart } from 'chart.js';
import { DataSet } from '../models/dataset.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

    @ViewChild('barChart', { static: true }) barChart;

    DATES = ['1/7/20', '2/7/20', '3/7/20', '4/7/20', '5/7/20', '6/7/20', '7/7/20', '8/7/20', '9/7/20', '10/7/20', '11/7/20', '12/7/20'];
    ABSENTEES = [15, 35, 50, 30, 85, 40, 15, 35, 50, 30, 85, 40];
    EARLY_LEAVERS = [15, 40, 20, 325, 85, 70, 15, 40, 20, 325, 85, 70];
    LATE_COMERS = [155, 435, 650, 230, 385, 1340, 155, 435, 650, 230, 385, 1340];
    dateStats: {} = {dates: this.DATES, absentees: this.ABSENTEES, earlyLeavers: this.EARLY_LEAVERS, lateComers: this.LATE_COMERS};

    bars: any;
    colorArray: any;
    dataSet: DataSet;
    absentees = {label: 'Absentees', data: this.ABSENTEES, backgroundColor: 'red'};
    lateComers = {label: 'Late Comers', data: this.LATE_COMERS, backgroundColor: 'green'};
    earlyLeavers = {label: 'Early Leavers', data: this.EARLY_LEAVERS, backgroundColor: 'orange'};
    label: string;
    fromDate: string;
    fromDatePicker: any;
    toDate: string;
    toDatePicker: any;

    constructor() { }

    ngOnInit() {
      this.label = 'absentees';
      this.getLabel();
    }

    ionViewDidEnter() {
      this.createBarChart();
    }

    getLabel() {
      console.log('get label');
      if (this.label === 'absentees') {
        this.dataSet = Object.assign({}, this.absentees);
      } else if (this.label === 'lateComers') {
        this.dataSet = Object.assign({}, this.lateComers);
      } else {
        this.dataSet = Object.assign({}, this.earlyLeavers);
      }
      this.createBarChart();
    }

    getFromDate() {
      console.log('from date: ', this.fromDate);
      this.fromDatePicker = {
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Done',
            handler: res => {
              console.log('res: ', res);
            }
          }
        ]
      };
    }

    getToDate() {
      console.log('to date: ', this.toDate);
      this.toDatePicker = {
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Done',
            handler: res => {
              console.log('res: ', res);
            }
          }
        ]
      };
    }

    createBarChart() {
      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.DATES,
          datasets: [this.dataSet]
          // datasets: [{
          //   label: this.status.label,
          //   data: [15, 35, 50, 30, 85, 40],
          //   backgroundColor: this.status.color
          //   // backgroundColor: 'rgb(38, 194, 129)',
          //   // borderColor: 'rgb(38, 194, 129)',
          //   // borderWidth: 1
          // }]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
}
