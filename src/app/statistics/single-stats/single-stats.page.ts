import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { UserService } from 'src/app/services/user.service';
import { StatService } from 'src/app/services/stat.service';

@Component({
  selector: 'app-single-stats',
  templateUrl: './single-stats.page.html',
  styleUrls: ['./single-stats.page.scss'],
})
export class SingleStatsPage implements OnInit {

  presentees: number;
  absentees: number;
  earlyLeavers: number;
  lateComers: number;
  // date: string = new Date().toISOString();
  date = new Date(2020, 6, 2).toISOString();
  dateStat$: Observable<any>;

  // Option
  ChartOptions = {
    responsive: true,
    title: {
      display: true,
      // text: 'price'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    },

  };
  public chartColors: Color[] = [
    {
      backgroundColor: ['green', 'red', 'blue', 'orange']
    },
  ];
  chartType: string;
  chartTypeVal = 'pie';
  showLegend: false;

  // For search
  // stock = '';

  // Data
  public pieChartLabels: Label[] = ['Present', 'Absent', 'Early leavers', 'Late comers'];
  public pieChartData: SingleDataSet = [this.presentees, this.absentees, this.earlyLeavers, this.lateComers];

  constructor(
    private userService: UserService,
    private statService: StatService
  ) {}

  ngOnInit() {
    this.getDateStat();
  }

  ionViewDidEnter() {
    this.getDateStat();
  }

  getDateStat() {
    console.log('get date stat');
    console.log('this date: ', this.date);
    this.dateStat$ = this.statService.getDateStat$(new Date(this.date));
    this.dateStat$.subscribe(data => {
      this.chartType = this.chartTypeVal;
      console.log('date stat: ', data);
      this.presentees = data.presentees;
      this.absentees = data.absentees;
      this.lateComers = data.lateComers;
      this.earlyLeavers = data.earlyLeavers;
      this.modifyChart();
    });
  }

  modifyChart() {
    this.pieChartData = [this.presentees, this.absentees, this.earlyLeavers, this.lateComers];
  }

  // getData() {
  //   this.http.get('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=2018-03-12&to=2019-03-12&apikey=demo')
  //     .subscribe(res => {
  //       console.log('Res: ', res);
  //       const history = res ['historical'];

  //       this.chartData[0].data = [];
  //       this.chartLabels = [];

  //       for(let entry of history){
  //         this.chartLabels.push(entry.date);
  //         this.chartData[0].data.push(entry['close']);
  //       }
  //       console.log('data: ', this.chartData);
  //     });
  // }
}
