import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FenceHistoryPage } from '../fence-history/fence-history.page';
import { UserService } from '../services/user.service';
import { Observable, interval, Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { DateTimeService } from '../services/date-time.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.page.html',
  styleUrls: ['./employee-home.page.scss'],
})
export class EmployeeHomePage implements OnInit {

  inFence = false;
  userLog$: Observable<any>;
  user$: Observable<any>;
  status: string;
  duration: string;
  amount: number;
  durationMinutes: number;
  durationHrs: number;
  totalDuration: number;
  clockedIn = false;
  salary: number;
  perUnitTime: string;
  stopwatch: Observable<number> = interval(1000);
  secCompleted = false;
  minCompleted = false;
  hrCompleted = false;

  durationTime = {
    hr: {
      text: '00',
      value: 0
    },
    min: {
      text: '00',
      value: 0
    },
    sec: {
      text: '00',
      value: 0
    }
  };

  clockInTime = {
    hr: {
      text: '00',
      value: 0
    },
    min: {
      text: '00',
      value: 0
    },
    meridiem: ''
  };

  clockOutTime = {
    hr: {
      text: '00',
      value: 0
    },
    min: {
      text: '00',
      value: 0
    },
    meridiem: ''
  };

  shiftStartTime = {
    hr: {
      text: '00',
      value: 0
    },
    min: {
      text: '00',
      value: 0
    },
    meridiem: ''
  };

  shiftEndTime = {
    hr: {
      text: '00',
      value: 0
    },
    min: {
      text: '00',
      value: 0
    },
    meridiem: ''
  };

  public MINS_PER_HR = 60;
  public MINS_PER_DAY = 1440;
  durationSubscription: Subscription;

  constructor(
    private modalCrl: ModalController,
    private userService: UserService,
    private dateTimeService: DateTimeService
  ) { }

  ngOnInit() {
    // this.calDuration();
    this.amount = 0;
    this.user$ = this.userService.getUser$();
    this.user$.subscribe(user => {
      this.salary = user.salary;
      this.perUnitTime = user.perUnitTime;
      this.shiftStartTime = {
        hr: {
          text: this.dateTimeService.display('hours', user.shiftStart.hr),
          value: user.shiftStart.hr
        },
        min: {
          text: this.dateTimeService.display('minutes', user.shiftStart.min),
          value: user.shiftStart.min
        },
        meridiem: this.dateTimeService.getMeridiem(null, user.shiftStart.hr)
      };

      this.shiftEndTime = {
        hr: {
          text: this.dateTimeService.display('hours', user.shiftEnd.hr),
          value: user.shiftEnd.hr
        },
        min: {
          text: this.dateTimeService.display('minutes', user.shiftEnd.min),
          value: user.shiftEnd.min
        },
        meridiem: this.dateTimeService.getMeridiem(null, user.shiftEnd.hr)
      };
    });

    // this.userLog$ = this.userService.getUserLog$();
    // this.userService.getUserLog$().subscribe(log => {
    //   this.clockInTime.hr.text = this.dateTimeService.display('hours', null, log.clockInTime.toDate());
    //   this.clockInTime.min.text = this.dateTimeService.display('minutes', null, log.clockInTime.toDate());
    //   this.clockInTime.meridiem = this.dateTimeService.getMeridiem(log.clockInTime.toDate());
    //   this.clockOutTime.hr.text = this.dateTimeService.display('hours', null, log.clockOutTime.toDate());
    //   this.clockOutTime.min.text = this.dateTimeService.display('minutes', null, log.clockOutTime.toDate());
    //   this.clockOutTime.meridiem = this.dateTimeService.getMeridiem(log.clockOutTime.toDate());
    // });
  }

  calDuration() {
    // this.durationSubscription = this.stopwatch
      // .pipe(
      //   takeWhile(second => second < 10),
      //   switchMap(async sec => sec)
      // )
      // .subscribe(sec => {
        // console.log('sec: ', sec);
        // console.log('duration subscribe');
        // this.durationTime.sec.value = sec;
        // this.durationTime.sec.text = this.dateTimeService.display('seconds', sec);

        // if (this.perUnitTime === 'sec') {
        //   this.amount += this.salary;
        // }

        // if (this.secCompleted) {

        //   this.secCompleted = false;

        //   this.durationTime.min.value += 1;
        //   this.durationTime.min.text = this.dateTimeService.display('minutes', this.durationTime.min.value);

        //   if (this.perUnitTime === 'min') {
        //     this.amount += this.salary;
        //   }

        //   if (this.minCompleted) {

        //     this.minCompleted = false;
        //     this.durationTime.min.value = 0;

        //     this.durationTime.hr.value += 1;
        //     this.durationTime.hr.text = this.dateTimeService.display('hours', this.durationTime.hr.value);

        //     if (this.perUnitTime === 'hr') {
        //       this.amount += this.salary;
        //     }

            // if (this.hrCompleted) {

            //   this.durationTime.hr.value = 0;
            //   this.hrCompleted = false;

            //   if (this.perUnitTime === 'hr') {
            //     this.amount += this.salary;
            //   }
            // }
            // if (this.durationTime.hr.value === 2) {
            //   this.hrCompleted = true;
            // }
          // }

      //     if (this.durationTime.min.value === 2) {
      //       this.minCompleted = true;
      //     }
      //   }

      //   if (sec === 9) {
      //     this.secCompleted = true;
      //     this.calDuration();
      //   }
      // });

      this.durationSubscription = this.stopwatch
        .subscribe(sec => {
          this.durationTime.sec.value = sec % 60;
          this.durationTime.min.value = Math.floor(sec / 60);
          this.durationTime.hr.value = Math.floor(this.durationTime.min.value / 60);
          this.durationTime.sec.text = this.dateTimeService.display('seconds', this.durationTime.sec.value);
          this.durationTime.min.text = this.dateTimeService.display('seconds', this.durationTime.min.value);
          this.durationTime.hr.text = this.dateTimeService.display('seconds', this.durationTime.hr.value);
          this.calAmount();
        });
  }

  calAmount() {
    if (this.perUnitTime === 'sec') {
      this.amount = this.salary * this.durationTime.sec.value;
    } else if (this.perUnitTime === 'min') {
      this.amount = this.salary * this.durationTime.min.value;
    } else {
      this.amount = this.salary * this.durationTime.hr.value;
    }
  }

  refreshLocation() {
    this.inFence = !this.inFence;
  }

  inShiftInterval() {
    return this.dateTimeService.inInterval(
      {
        startHr: this.shiftStartTime.hr.value,
        startMin: this.shiftStartTime.min.value
      },
      {
        endHr: this.shiftEndTime.hr.value,
        endMin: this.shiftEndTime.min.value
      },
      {
        currentHr: this.clockInTime.hr.value,
        currentMin: this.clockInTime.min.value
      },
    );
  }

  clockIn() {
    this.calDuration();
    this.clockedIn = true;
    const date = new Date();
    this.clockInTime = {
      hr: {
        text: this.dateTimeService.display('hours', null, date),
        value: this.dateTimeService.getHours(date)
      },
      min: {
        text: this.dateTimeService.display('minutes', null, date),
        value: this.dateTimeService.getMinutes(date)
      },
      meridiem: this.dateTimeService.getMeridiem(new Date())
    };
    // console.log('time now hrs: ', this.clockInTime.hr.text);
    // console.log('time now min: ', this.clockInTime.min.text);
    // console.log('time now meridiem: ', this.clockInTime.meridiem);
  }

  clockOut() {
    this.clockedIn = false;
    const date = new Date();
    this.clockOutTime = {
      hr: {
        text: this.dateTimeService.display('hours', null, date),
        value: this.dateTimeService.getHours(date)
      },
      min: {
        text: this.dateTimeService.display('minutes', null, date),
        value: this.dateTimeService.getMinutes(date)
      },
      meridiem: this.dateTimeService.getMeridiem(new Date())
    };
    // console.log('time now hrs: ', this.clockOutTime.hr.text);
    // console.log('time now min: ', this.clockOutTime.min.text);
    // console.log('time now meridiem: ', this.clockOutTime.meridiem);
    this.durationSubscription.unsubscribe();
  }

  // calDuration() {
  //   let startx = null;
  //   let endx = null;
  //   startx = this.clockInTime.hr.value * this.MINS_PER_HR + this.clockInTime.min.value;
  //   endx = this.clockOutTime.hr.value * this.MINS_PER_HR + this.clockOutTime.min.value;
  //   this.totalDuration = endx - startx;
  //   if (this.totalDuration < 0) {
  //     this.totalDuration = this.totalDuration + this.MINS_PER_DAY;
  //   }
  //   this.durationHrs = Math.floor (this.totalDuration / 60);
  //   this.durationMinutes = this.totalDuration % 60;
  //   console.log('duration hrs: ', this.durationHrs);
  //   console.log('duration mins: ', this.durationMinutes);
  //   console.log('duration total: ', this.totalDuration);
  // }

  async openFenceHistory() {
    const fenceHistoryModal = await this.modalCrl.create({
      component: FenceHistoryPage
    });
    fenceHistoryModal.present();
  }

}
