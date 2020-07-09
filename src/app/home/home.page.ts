import { Component } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Data
  public pieChartLabels: Label[] = ['present','Absent','Early leavers','Late comers'];
  public pieChartData: SingleDataSet = [200,300,400,500];

  //Option
  ChartOptions = {
    responsive: true,
    // title: {
    //   display: true,
    //   text: 'price'
    // },
    // pan: {
    //   enabled: true,
    //   mode: 'xy'
    // },
    // zoom: {
    //   enabled: true,
    //   mode: 'xy'
    // },

  };
  chartColors: Color [] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    }
  ];
  chartType = 'pie';
  showLegend: false;

  // For search
  stock = 'AAPL';

  constructor(private http: HttpClient) {
    // this.getData();
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
