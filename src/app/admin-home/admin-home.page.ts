import { Component, OnInit } from '@angular/core';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { UserService } from '../services/user.service';
import { ChartDataSets } from 'chart.js';
import { StatService } from '../services/stat.service';
import { Observable } from 'rxjs';
import { MemberService } from '../services/member.service';
import { DateTimeService } from '../services/date-time.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

  members$: Observable<any[]>;

  clockInTime = {
    hr: {
      value: 0,
      text: '00'
    },
    min: {
      value: 0,
      text: '00'
    }
  };

  clockOutTime = {
    hr: {
      value: 0,
      text: '00'
    },
    min: {
      value: 0,
      text: '00'
    }
  };

  constructor(
    private memberService: MemberService,
    public dateTimeService: DateTimeService
  ) {}

  ngOnInit() {
    this.members$ = this.memberService.getTodayStatus$();
  //   this.members$.subscribe(todaysData => {
  //     array.forEach(element => {
  //     });
  //     this.clockInTime.text = this.dateTimeService.display('minutes', todaysData.clockInTime.hr)
  //   })
  }

}
