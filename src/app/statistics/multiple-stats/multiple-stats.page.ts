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

  @ViewChild('barChart', { static: true }) barChart;

  bars: Chart;
  colorArray: any;
  dataSet: any;
  absentees = { label: 'Absentees', data: [], backgroundColor: 'red' };
  lateComers = { label: 'Late Comers', data: [], backgroundColor: 'blue' };
  presentees = { label: 'Presentees', data: [], backgroundColor: 'green' };
  earlyLeavers = { label: 'Early Leavers', data: [], backgroundColor: 'orange' };
  label: string;
  fromDate: string = new Date(2020, 6, 1).toISOString();
  fromDateObj: Date = new Date(2020, 6, 1);
  fromDatePicker: any;
  toDate: string = new Date().toISOString();
  toDateObj: Date = new Date();
  toDatePicker: any;
  stats$: Observable<any[]>;
  dateRange: Date[];
  dateStringLabels: string[] = [];
  singleDate = false;
  chartType = 'bar';

  constructor(
    private statService: StatService,
    private dateTimeService: DateTimeService
  ) { }

  ngOnInit() {
    this.label = 'presentees';
    this.stats$ = this.statService.getStats$();
  }

  ionViewDidEnter() {
    this.getStatsRange();
  }

  async getStatsRange() {
    console.log('from date: ', this.fromDate);
    console.log('to date: ', this.toDate);
    if (this.fromDate === this.toDate) {
      this.singleDate = true;
      console.log('single date: ', this.singleDate);
      return;
    }
    console.log('get stats range');
    this.absentees.data = [];
    this.presentees.data = [];
    this.earlyLeavers.data = [];
    this.lateComers.data = [];
    this.dateStringLabels = [];
    this.getLabel();
    this.stats$ = this.statService.getStatsRange$(new Date(this.fromDate), new Date(this.toDate));
    this.stats$.subscribe(rangeData => {
      console.log('range data: ', rangeData);
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
        if (this.bars) {
          this.bars.destroy();
        }
        this.createBarChart();
      });
    });
  }

  async getLabel() {
    console.log('get label');
    if (this.label === 'absentees') {
      this.dataSet = Object.assign({}, this.absentees);
    } else if (this.label === 'lateComers') {
      this.dataSet = Object.assign({}, this.lateComers);
    } else if (this.label === 'presentees') {
      this.dataSet = Object.assign({}, this.presentees);
    } else {
      this.dataSet = Object.assign({}, this.earlyLeavers);
    }
  }

  async getFromDate() {
    console.log('get from date');
    this.fromDateObj = new Date(this.fromDate);
  }

  async getToDate() {
    console.log('get to date');
    this.toDateObj = new Date(this.toDate);
  }

  createChart() {
    switch (this.chartType) {
      case 'bar':
        this.createBarChart();
        break;

      case 'line':
        this.createLineChart();
        break;

      // case 'group-line':
      //   this.createGroupLineChart();
      //   break;

      case 'area':
        this.createAreaChart();
        break;

      // case 'group-area':
      //   this.createGroupAreaChart();
      //   break;

      default:
        this.createBarChart();
        break;
    }
  }

  createBarChart() {
    console.log('create bar chart');
    console.log('date string labels: ', this.dateStringLabels);
    console.log('date set: ', this.dataSet);
    this.bars = new Chart(this.barChart.nativeElement, {
      type: this.chartType,
      data: {
        labels: this.dateStringLabels,
        datasets: [this.dataSet]
      },
      options: {
        // responsive: true,
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

  createLineChart() {
    this.chartType = 'line';
    this.getStatsRange();
    console.log('create line chart');

    const speedCanvas = document.getElementById('speedChart');

    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;

    const dataFirst = {
      label: 'Car A - Speed (mph)',
      data: [0, 59, 75, 20, 20],
      lineTension: 0,
      fill: false,
      borderColor: 'red'
    };

    const dataSecond = {
      label: 'Car B - Speed (mph)',
      data: [20, 15, 60, 60, 65],
      lineTension: 0,
      fill: false,
      borderColor: 'blue'
    };

    // const speedData = {
    //   labels: ['0s', '10s', '20s', '30s', '40s'],
    //   datasets: [dataFirst, dataSecond]
    // };

    const chartOptions = {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      }
    };

    // const lineChart = new Chart(speedCanvas, {
    //   type: 'line',
    //   data: speedData,
    //   options: chartOptions
    // });
  }

  createGroupLineChart() {
    console.log('create group line chart');
  }

  createAreaChart() {
    this.chartType = 'line';
    this.getStatsRange();
    console.log('create area chart');
  }

  createGroupAreaChart() {
    console.log('create group area chart');
  }

  canvasClicked() {
    console.log('canvas clicked');
  }

  // createLineChart() {
  //   this.chartType = 'line';
  //   this.getStatsRange();
  //   console.log('create line chart');
    // var speedCanvas = document.getElementById("speedChart");

    // Chart.defaults.global.defaultFontFamily = "Lato";
    // Chart.defaults.global.defaultFontSize = 18;

    // var dataFirst = {
    //   label: "Car A - Speed (mph)",
    //   data: [0, 59, 75, 20, 20],
    //   lineTension: 0,
    //   fill: false,
    //   borderColor: 'red'
    // };

    // var dataSecond = {
    //   label: "Car B - Speed (mph)",
    //   data: [20, 15, 60, 60, 65],
    //   lineTension: 0,
    //   fill: false,
    //   borderColor: 'blue'
    // };

    // var speedData = {
    //   labels: ["0s", "10s", "20s", "30s", "40s"],
    //   datasets: [dataFirst, dataSecond]
    // };

    // var chartOptions = {
    //   legend: {
    //     display: true,
    //     position: 'top',
    //     labels: {
    //       boxWidth: 80,
    //       fontColor: 'black'
    //     }
    //   }
    // };

    // var lineChart = new Chart(speedCanvas, {
    //   type: 'line',
    //   data: speedData,
    //   options: chartOptions
    // });
  // }

}
