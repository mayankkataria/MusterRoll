import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { DateTimeService } from '../services/date-time.service';
import { ClockInPage } from '../clock-in/clock-in.page';
import { FenceHistoryPage } from '../fence-history/fence-history.page';

@Component({
  selector: 'app-datelog',
  templateUrl: './datelog.page.html',
  styleUrls: ['./datelog.page.scss'],
})
export class DatelogPage implements OnInit {
  inFence = false;
  userLog$: Observable<any>;
  user$: Observable<any>;
  inStatus = 'late arrival';
  outStatus = 'early departure';
  duration: string;
  amount = 0;
  durationMinutes: number;
  durationHrs: number;
  totalDuration: number;
  clockedIn = false;
  clockedOut = false;
  salary: number;
  perUnitTime: string;
  stopwatch: Observable<number> = interval(1000);
  withinShift = false;
  toast: any;

  dateLog: {
    date: Date, inStatus: string, outStatus?: string,
    clockInTime?: {}, clockOutTime?: {}, durationTime?: {},
    lateDuration?: {}, earlyDuration?: {}, amount?: number
  } = { date: new Date(), inStatus: 'absent' };
  dateLogObservable: Observable<any> = new Observable();
  dateLogObserver = {
    next: dateLog => {
      console.log('date: ', this.dateLog.date.toDateString());
      this.userService.setMergeDateLog(dateLog);
    },
  };

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
  };

  earlyDuration = {
    hr: {
      text: '00',
      value: 0
    },
    min: {
      text: '00',
      value: 0
    }
  };

  public MINS_PER_HR = 60;
  public MINS_PER_DAY = 1440;
  durationSubscription: Subscription;

  constructor(
    private modalCrl: ModalController,
    private userService: UserService,
    private dateTimeService: DateTimeService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // this.amount = 0;
    // this.user$ = this.userService.getUser$();
    // this.user$.subscribe(user => {
    //   this.salary = user.salary;
    //   this.perUnitTime = user.perUnitTime;
    //   this.shiftStartTime = {
    //     hr: {
    //       text: this.dateTimeService.display('hours', user.shiftStart.hr),
    //       value: user.shiftStart.hr
    //     },
    //     min: {
    //       text: this.dateTimeService.display('minutes', user.shiftStart.min),
    //       value: user.shiftStart.min
    //     },
    //     meridiem: this.dateTimeService.getMeridiem(null, user.shiftStart.hr)
    //   };

    //   this.shiftEndTime = {
    //     hr: {
    //       text: this.dateTimeService.display('hours', user.shiftEnd.hr),
    //       value: user.shiftEnd.hr
    //     },
    //     min: {
    //       text: this.dateTimeService.display('minutes', user.shiftEnd.min),
    //       value: user.shiftEnd.min
    //     },
    //     meridiem: this.dateTimeService.getMeridiem(null, user.shiftEnd.hr)
    //   };

    //   this.withinShift = this.dateTimeService.inInterval(
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
    // });
    // this.dateLogObserver.next(this.dateLog);
    // this.dateLogObservable.subscribe(this.dateLogObserver);

    // functions.pubsub.schedule('every 5 minutes').onRun(context => {
    //   console.log('scheduler');
    // });
  }

  async openFenceHistory() {
    const fenceHistoryModal = await this.modalCrl.create({
      component: FenceHistoryPage
    });
    fenceHistoryModal.present();
  }
}
