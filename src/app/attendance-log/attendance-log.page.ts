import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-attendance-log',
  templateUrl: './attendance-log.page.html',
  styleUrls: ['./attendance-log.page.scss'],
})
export class AttendanceLogPage implements OnInit {

  logItems$: Observable<any>;
  // dateString: {
  //   day?, date?, month?, year?
  // } = {};
  // dateArr = [];
  contentLoaded=false;
  constructor(
    private userService: UserService
  ) {
    console.log('attendance-log constructor');
    this.logItems$ = this.userService.getUserLogs$();
    // this.logItems$.subscribe(logs => {
    //   console.log('logs: ', logs);
    //   logs.forEach(log => {
    //     console.log('log month: ', log.date.toDate().toLocaleString('default', { month: 'long' }));
    //     console.log('log date: ', log.date.toDate().toDateString());
    //     this.dateArr = log.date.toDate().toDateString().split(' ');
    //     console.log('date arr: ', this.dateArr);
    //     this.dateString.day = this.dateArr[0];
    //     this.dateString.month = this.dateArr[1];
    //     this.dateString.date = this.dateArr[2];
    //     this.dateString.year = this.dateArr[3];
    //   });
    // });

    setTimeout(() => {
      this.contentLoaded=true;
    },3000);
  }

  ngOnInit() {
    console.log('attendance log ngoninit');
  }

}
