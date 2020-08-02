import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FenceHistoryPage } from '../fence-history/fence-history.page';
import { UserService } from '../services/user.service';
import { Observable, interval, Subscription, of, Observer } from 'rxjs';
import { DateTimeService } from '../services/date-time.service';
import { switchMap } from 'rxjs/operators';
import * as functions from 'firebase-functions';
import { ClockInPage } from '../clock-in/clock-in.page';
import { MemberService } from '../services/member.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { StatService } from '../services/stat.service';
import { HttpClient } from '@angular/common/http';
import { MapService } from '../services/map.service';
import * as voiceFunctions from 'voiceit2-nodejs';
// import { voiceit2 } from 'voiceit2-nodejs';

// import voiceit2 = require('voiceit2-nodejs');

// const voiceit2 = require('voiceit2-nodejs');


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.page.html',
  styleUrls: ['./employee-home.page.scss'],
})

export class EmployeeHomePage implements OnInit {
  messages = this.http.get<any[]>('http://localhost:4201');
  inFence = false;
  userLog$: Observable<any>;
  user$: Observable<any>;
  userUid: string;
  inStatus: string;
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
  withinShift = false;
  toast: any;
  firstname: string;
  lastname: string;
  todaysDate: Date;
  // myVoiceIt = new voiceFunctions('42866674a3014801ba72071f04ddc35a', '9577d0cbc735457f8a7fbd54c4f2b1aa');
  // myVoiceIt = new voiceit2('42866674a3014801ba72071f04ddc35a', '9577d0cbc735457f8a7fbd54c4f2b1aa');
  // myVoiceIt = new voiceit2('fsdsdf', '');
  dateLog: {
    dateId: string, date: Date, status?: string, inStatus?: string, outStatus?: string,
    clockInTime?: {}, clockOutTime?: {}, durationTime?: {},
    lateDuration?: {}, earlyDuration?: {}, amount?: number
  } = { dateId: this.afs.createId(), date: new Date(), status: 'absent' };

  todayLog: {
    recentDate?: Date, firstname?: string, lastname?: string, status?: string, inStatus?: string, outStatus?: string,
    clockInTime?: {}, clockOutTime?: {}, durationTime?: {}, lateBy?: {}, earlyBy?: {}, amount?: number,
    fenceStatus?: boolean
  } = {};

  dateLogObservable: Observable<any> = new Observable();
  dateLogObserver = {
    next: dateLog => {
      console.log('date: ', this.dateLog.date.toDateString());
      console.log('date: ', this.dateLog.date.getMonth());
      this.userService.setMergeDateLog(dateLog);
    },
  };

  todayLogObservable: Observable<any> = new Observable();
  todayLogObserver = {
    next: todayLog => {
      todayLog.recentDate = Date.now();
      this.memberService.setMergeTodaysLog(todayLog, this.userUid);
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
    private http: HttpClient,
    private modalCrl: ModalController,
    private userService: UserService,
    private dateTimeService: DateTimeService,
    private modalController: ModalController,
    private toastController: ToastController,
    private memberService: MemberService,
    private afs: AngularFirestore,
    private statService: StatService,
    private mapService: MapService
  ) { }

  ngOnInit() {

    // this.myVoiceIt.getPhrases({ contentLanguage : 'en-US' }, (jsonResponse) => {
    //   console.log('json res: ', jsonResponse);
    // });

    this.todaysDate = new Date(2020, 7, 2);
    this.statService.incrementStats(this.todaysDate, status);
    this.amount = 0;
    this.user$ = this.userService.getUser$();
    this.user$.subscribe(user => {
      this.userUid = user.uid;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
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

      console.log('within shift: ', this.withinShift);

    });
    // this.dateLogObserver.next(this.dateLog);
    this.dateLogObservable.subscribe(this.dateLogObserver);
    this.todayLogObservable.subscribe(this.todayLogObserver);
    // functions.pubsub.schedule('every 5 minutes').onRun(context => {
    //   console.log('scheduler');
    // });
  }

  async clockIn() {
    const biometricResult = await this.getBioResult();
    if (biometricResult !== 'biometric_success') {
      this.toast = this.toastController.create({
        message: 'Invalid Biometric',
        duration: 3000
      });
      await this.toast.present();
      return;
    }
    // const biometricResult = 'biometric_success';
    if (biometricResult === 'biometric_success') {
      status = 'present';
      this.statService.decrementAbsentee(this.todaysDate);
      this.statService.incrementStats(this.todaysDate, status);
      this.clockedIn = true;
      this.todayLog.firstname = this.firstname;
      this.todayLog.lastname = this.lastname;
      this.todayLog.status = status;
      this.dateLog.status = status;
      this.calDuration();
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

      this.toast = await this.toastController.create({
        message: 'Clocked In',
        duration: 1000
      });
      await this.toast.present();

      // this.dateLog = { ...this.dateLog, ...{ clockInTime: this.clockInTime } };

      this.dateLog.clockInTime = this.clockInTime;
      this.todayLog.clockInTime = this.clockInTime;
      this.dateLogObserver.next(this.dateLog);
      this.todayLogObserver.next(this.todayLog);

      // this.dateLogObs = new Observable(obs => {
      //   obs.next(this.dateLog);
      // });

      this.assignInStatus();

    }

  }

  assignInStatus() {
    if (this.clockInTime.hr.value !== this.shiftStartTime.hr.value
      || this.clockInTime.min.value !== this.shiftStartTime.min.value) {
      this.inStatus = 'late arrival';
      this.statService.incrementStats(this.todaysDate, this.inStatus);
      this.calLateDuration();
    } else {
      this.inStatus = null;
    }

    this.dateLog.inStatus = this.inStatus;
    this.todayLog.inStatus = this.inStatus;

    this.todayLogObserver.next(this.todayLog);
  }

  calDuration() {
    this.durationSubscription = this.stopwatch
      .subscribe(sec => {
        this.durationTime.sec.value = sec % 60;
        this.durationTime.min.value = Math.floor(sec / 60);
        this.durationTime.hr.value = Math.floor(this.durationTime.min.value / 60);
        this.durationTime.sec.text = this.dateTimeService.display('seconds', this.durationTime.sec.value);
        this.durationTime.min.text = this.dateTimeService.display('minutes', this.durationTime.min.value);
        this.durationTime.hr.text = this.dateTimeService.display('hours', this.durationTime.hr.value);
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

  async getBioResult() {
    try {
      let biometricResult;
      const biometricModal = await this.modalController.create({
        component: ClockInPage,
      });
      await biometricModal.present();
      const res = await biometricModal.onDidDismiss();
      biometricResult = res.data.biometricResult;
      console.log('bio result: ', biometricResult);
      return biometricResult;
    } catch (err) {
      console.log('biometric error: ', err);
      return err;
    }
  }


  calLateDuration() {
    let startx = null;
    let endx = null;
    startx = this.shiftStartTime.hr.value * this.MINS_PER_HR + this.shiftStartTime.min.value;
    endx = this.clockInTime.hr.value * this.MINS_PER_HR + this.clockInTime.min.value;
    this.totalDuration = endx - startx;
    if (this.totalDuration < 0) {
      this.totalDuration = this.totalDuration + this.MINS_PER_DAY;
    }
    this.lateDuration.hr.value = Math.floor(this.totalDuration / 60);
    this.lateDuration.min.value = this.totalDuration % 60;
    this.lateDuration.hr.text = this.dateTimeService.display('hours', this.lateDuration.hr.value);
    this.lateDuration.min.text = this.dateTimeService.display('minutes', this.lateDuration.min.value);
    // this.dateLog = { ...this.dateLog, ...{ lateDuration: this.lateDuration } };
    this.dateLog.lateDuration = this.lateDuration;
    this.todayLog.lateBy = this.lateDuration;

    this.todayLogObserver.next(this.todayLog);
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
    this.dateLog.clockOutTime = this.clockOutTime;
    this.dateLog.durationTime = this.durationTime;
    this.dateLog.amount = this.amount;

    this.todayLog.clockOutTime = this.clockOutTime;
    this.todayLog.amount = this.amount;

    this.dateLogObserver.next(this.dateLog);
    this.todayLogObserver.next(this.todayLog);
    this.assignOutStatus();
  }

  assignOutStatus() {
    if (this.clockOutTime.hr.value !== this.shiftEndTime.hr.value
      || this.clockOutTime.min.value !== this.shiftEndTime.min.value) {
      this.outStatus = 'early departure';
      this.statService.incrementStats(this.todaysDate, this.outStatus);
      this.calEarlyDuration();
    } else {
      this.outStatus = null;
    }
    this.dateLog.outStatus = this.outStatus;
    this.todayLog.outStatus = this.outStatus;

    this.todayLogObserver.next(this.todayLog);
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
    this.earlyDuration.hr.value = Math.floor(this.totalDuration / 60);
    this.earlyDuration.min.value = this.totalDuration % 60;
    this.earlyDuration.hr.text = this.dateTimeService.display('hours', this.earlyDuration.hr.value);
    this.earlyDuration.min.text = this.dateTimeService.display('minutes', this.earlyDuration.min.value);
    this.dateLog.earlyDuration = this.earlyDuration;
    this.todayLog.earlyBy = this.earlyDuration;
    console.log('early Duration: ', this.dateLog);

    this.todayLogObserver.next(this.todayLog);
  }

  refreshLocation() {
    this.inFence = !this.inFence;
    if (this.clockedIn) {
      this.todayLog.fenceStatus = this.inFence;
      this.todayLogObserver.next(this.todayLog);
    }
  }

  async openFenceHistory() {
    const fenceHistoryModal = await this.modalCrl.create({
      component: FenceHistoryPage
    });
    fenceHistoryModal.present();
  }

  voiceAuth() {
    this.http.post<any>('http://localhost:4201/user', {username: 'Hello', password: 'world@123'})
    .subscribe(next => console.log(next));
  }
}
