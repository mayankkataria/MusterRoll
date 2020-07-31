import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { Observable } from 'rxjs';
import { StatService } from 'src/app/services/stat.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-multiple-stats',
  templateUrl: './multiple-stats.page.html',
  styleUrls: ['./multiple-stats.page.scss'],
})
export class MultipleStatsPage implements OnInit {

  @ViewChild('chartView', { static: true }) chartView;

  chart: Chart;
  colorArray: any;
  dataSet: any;
  absentees = { label: 'Absentees', data: [], backgroundColor: 'red', borderColor: 'red', borderWidth: 1 };
  lateComers = { label: 'Late Comers', data: [], backgroundColor: 'blue', borderColor: 'blue', borderWidth: 1 };
  presentees = { label: 'Presentees', data: [], backgroundColor: 'green', borderColor: 'green', borderWidth: 1 };
  earlyLeavers = { label: 'Early Leavers', data: [], backgroundColor: 'orange', borderColor: 'orange', borderWidth: 1 };
  label: string[];
  fromDate: string = new Date(2020, 6, 1).toISOString();
  fromDateObj: Date = new Date(2020, 6, 1);
  fromDatePicker: any;
  toDate: string = new Date(2020, 6, 7).toISOString();
  toDateObj: Date = new Date(2020, 6, 7);
  toDatePicker: any;
  stats$: Observable<any[]>;
  dateRange: Date[];
  dateStringLabels: string[] = [];
  singleDate = false;
  chartType = 'bar';
  chartTypeVal = 'bar';

  constructor(
    private statService: StatService,
    private dateTimeService: DateTimeService
  ) { }

  ngOnInit() {
    this.label = ['presentees'];
    this.getStatsRange();
    // this.stats$ = this.statService.getStats$();
  }

  ionViewDidEnter() {
    this.getStatsRange();
  }

  async getStatsRange() {
    console.log('get stats range');
    // this.absentees.data = [];
    // this.presentees.data = [];
    // this.earlyLeavers.data = [];
    // this.lateComers.data = [];
    // this.dateStringLabels = [];
    this.stats$ = this.statService.getStatsRange$(new Date(this.fromDate), new Date(this.toDate));
    this.stats$.subscribe(rangeData => {
      console.log('range data: ', rangeData);
      this.absentees.data = [];
      this.presentees.data = [];
      this.earlyLeavers.data = [];
      this.lateComers.data = [];
      this.dateStringLabels = [];
      rangeData.forEach(data => {
        const date = this.dateTimeService.getDate(data.date.toDate());
        const month = this.dateTimeService.getMonth(data.date.toDate());
        const year = this.dateTimeService.getFullYear(data.date.toDate());
        const dateString = `${date}/${month}/${year}`;
        this.dateStringLabels.push(dateString);
        this.absentees.data.push(data.absentees);
        this.earlyLeavers.data.push(data.earlyLeavers);
        this.lateComers.data.push(data.lateComers);
        this.presentees.data.push(data.presentees);
        if (this.chart) {
          this.chart.destroy();
        }
        this.chooseChart();
        this.makeDataset();
        this.createChart();
      });
    });
  }

  makeDataset() {
    console.log('make dataset');
    this.dataSet = [];
    if (this.label.includes('absentees')) {
      this.dataSet.push(this.absentees);
    }
    if (this.label.includes('lateComers')) {
      this.dataSet.push(this.lateComers);
    }
    if (this.label.includes('presentees')) {
      this.dataSet.push(this.presentees);
    }
    if (this.label.includes('earlyLeavers')) {
      this.dataSet.push(this.earlyLeavers);
    }
  }

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

  async getFromDate() {
    console.log('get from date');
    this.fromDateObj = new Date(this.fromDate);
  }

  async getToDate() {
    console.log('get to date');
    this.toDateObj = new Date(this.toDate);
  }

  chooseChart() {
    switch (this.chartTypeVal) {
      case 'bar':
        this.initBarChart();
        break;

      case 'line':
        this.initLineChart();
        break;

      case 'area':
        this.initAreaChart();
        break;

      default:
        this.initBarChart();
        break;
    }
  }

  createChart() {
    console.log('create chart');
    console.log('date string labels: ', this.dateStringLabels);
    console.log('date set: ', this.dataSet);
    this.chart = new Chart(this.chartView.nativeElement, {
      type: this.chartType,
      data: {
        labels: this.dateStringLabels,
        datasets: this.dataSet
      },
      options: {
        legend: {
          position: 'top',
          align: 'end'
        },
        // responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }
    });
  }

  initBarChart() {
    console.log('create bar chart');
    this.chartType = 'bar';
    this.absentees.backgroundColor = 'red';
    this.presentees.backgroundColor = 'green';
    this.earlyLeavers.backgroundColor = 'blue';
    this.lateComers.backgroundColor = 'orange';

    this.absentees.borderColor = 'rgba(0, 0, 0, 0)';
    this.presentees.borderColor = 'rgba(0, 0, 0, 0)';
    this.earlyLeavers.borderColor = 'rgba(0, 0, 0, 0)';
    this.lateComers.borderColor = 'rgba(0, 0, 0, 0)';
  }

  initLineChart() {
    console.log('create line chart');
    this.chartType = 'line';

    this.absentees.backgroundColor = 'rgba(0, 0, 0, 0)';
    this.presentees.backgroundColor = 'rgba(0, 0, 0, 0)';
    this.earlyLeavers.backgroundColor = 'rgba(0, 0, 0, 0)';
    this.lateComers.backgroundColor = 'rgba(0, 0, 0, 0)';

    this.absentees.borderColor = 'red';
    this.presentees.borderColor = 'green';
    this.earlyLeavers.borderColor = 'blue';
    this.lateComers.borderColor = 'orange';

    this.absentees.borderWidth = 1;
    this.presentees.borderWidth = 1;
    this.earlyLeavers.borderWidth = 1;
    this.lateComers.borderWidth = 1;
  }

  initAreaChart() {
    console.log('create area chart');
    this.chartType = 'line';
    this.absentees.backgroundColor = 'red';
    this.presentees.backgroundColor = 'green';
    this.earlyLeavers.backgroundColor = 'blue';
    this.lateComers.backgroundColor = 'orange';

    this.absentees.borderColor = 'rgba(0, 0, 0, 0)';
    this.presentees.borderColor = 'rgba(0, 0, 0, 0)';
    this.earlyLeavers.borderColor = 'rgba(0, 0, 0, 0)';
    this.lateComers.borderColor = 'rgba(0, 0, 0, 0)';
  }

  canvasClicked() {
    console.log('canvas clicked');
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getStatsRange();
      event.target.complete();
    }, 2000);
  }

}
