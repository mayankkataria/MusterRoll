import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FenceHistoryPage } from '../fence-history/fence-history.page';
import { UserService } from '../services/user.service';
import { Observable, interval, Subscription } from 'rxjs';
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
  inStatus = 'absent';
  outStatus = null;
  duration: string;
  amount: number;
  durationMinutes: number;
  durationHrs: number;
  totalDuration: number;
  clockedIn = false;
  clockedOut = false;
  salary: number;
  perUnitTime: string;
  stopwatch: Observable<number> = interval(1000);
  secCompleted = false;
  minCompleted = false;
  hrCompleted = false;
  withinShift = false;

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

  lateDuration = {
    hr: {
      text: '00',
      value: 0
    },
    min: {
      text: '00',
      value: 0
    }
  }

  earlyDuration = {
    hr: {
      text: '00',
      value: 0
    },
    min: {
      text: '00',
      value: 0
    }
  }

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

      this.withinShift = this.dateTimeService.inInterval(
        {
          startHr: this.shiftStartTime.hr.value,
          startMin: this.shiftStartTime.min.value
        },
        {
          endHr: this.shiftEndTime.hr.value,
          endMin: this.shiftEndTime.min.value
        },
        {
          currentHr: new Date().getHours(),
          currentMin: new Date().getMinutes()
        },
      );
    });
    console.log('within shift: ', this.withinShift);
  }

  calDuration() {
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
    this.getInStatus();
  }

  getInStatus() {
    if (this.clockInTime.hr.value !== this.shiftStartTime.hr.value
      || this.clockInTime.min.value !== this.shiftStartTime.min.value) {
      this.inStatus = 'late arrival';
      this.calLateDuration();
    } else {
      this.inStatus = null;
    }
  }

  clockOut() {
    this.durationSubscription.unsubscribe();
    this.clockedIn = false;
    this.clockedOut = true;
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
    this.getOutStatus();
  }

  getOutStatus() {
    if (this.clockOutTime.hr.value !== this.shiftEndTime.hr.value
      || this.clockOutTime.min.value !== this.shiftEndTime.min.value) {
      this.outStatus = 'early departure';
      this.calEarlyDuration();
    } else {
      this.outStatus = null;
    }
  }

  refreshLocation() {
    this.inFence = !this.inFence;
  }

  // inShiftInterval(): boolean {
  //   console.log('in shift time interval');
  //   return this.dateTimeService.inInterval(
  //     {
  //       startHr: this.shiftStartTime.hr.value,
  //       startMin: this.shiftStartTime.min.value
  //     },
  //     {
  //       endHr: this.shiftEndTime.hr.value,
  //       endMin: this.shiftEndTime.min.value
  //     },
  //     {
  //       currentHr: new Date().getHours(),
  //       currentMin: new Date().getMinutes()
  //     },
  //   );
  // }

  calLateDuration() {
    let startx = null;
    let endx = null;
    startx = this.shiftStartTime.hr.value * this.MINS_PER_HR + this.shiftStartTime.min.value;
    endx = this.clockInTime.hr.value * this.MINS_PER_HR + this.clockInTime.min.value;
    this.totalDuration = endx - startx;
    if (this.totalDuration < 0) {
      this.totalDuration = this.totalDuration + this.MINS_PER_DAY;
    }
    this.lateDuration.hr.value = Math.floor (this.totalDuration / 60);
    this.lateDuration.min.value = this.totalDuration % 60;
    this.lateDuration.hr.text = this.dateTimeService.display('hours', this.lateDuration.hr.value);
    this.lateDuration.min.text = this.dateTimeService.display('minutes', this.lateDuration.min.value);
  }

  calEarlyDuration() {
    let startx = null;
    let endx = null;
    startx = this.clockOutTime.hr.value * this.MINS_PER_HR + this.clockOutTime.min.value;
    endx = this.shiftEndTime.hr.value * this.MINS_PER_HR + this.shiftEndTime.min.value;
    this.totalDuration = endx - startx;
    if (this.totalDuration < 0) {
      this.totalDuration = this.totalDuration + this.MINS_PER_DAY;
    }
    this.earlyDuration.hr.value = Math.floor (this.totalDuration / 60);
    this.earlyDuration.min.value = this.totalDuration % 60;
    this.earlyDuration.hr.text = this.dateTimeService.display('hours', this.earlyDuration.hr.value);
    this.earlyDuration.min.text = this.dateTimeService.display('minutes', this.earlyDuration.min.value);
  }

  async openFenceHistory() {
    const fenceHistoryModal = await this.modalCrl.create({
      component: FenceHistoryPage
    });
    fenceHistoryModal.present();
  }

}
