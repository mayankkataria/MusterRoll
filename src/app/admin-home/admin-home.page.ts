import { Component, OnInit } from '@angular/core';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { UserService } from '../services/user.service';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage {

  present: number;
  absent: number;
  earlyLeavers: number;
  lateComers: number;

  // Option
  ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'price'
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
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    }
  ];
  chartType = 'pie';
  showLegend: false;

  // For search
  stock = 'AAPL';

  // Data
  public pieChartLabels: Label[] = ['Present', 'Absent', 'Early leavers', 'Late comers'];
  public pieChartData: SingleDataSet = [this.present, this.absent, this.earlyLeavers, this.lateComers];

  modifyChart() {
    this.pieChartData = [this.present, this.absent, this.earlyLeavers, this.lateComers];
  }


  constructor(
    private userService: UserService
  ) {
    // this.getData();
    // userService.getURole$()
    //   .subscribe(role => console.log('role: ', role));
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
