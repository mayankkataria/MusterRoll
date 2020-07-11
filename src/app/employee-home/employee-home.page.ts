import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FenceHistoryPage } from '../fence-history/fence-history.page';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DateTimeService } from '../services/date-time.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.page.html',
  styleUrls: ['./employee-home.page.scss'],
})
export class EmployeeHomePage implements OnInit {

  inFence = false;
  userLog$: Observable<any>;
  clockIn = {
    hr: {
      text: '',
      value: 0
    },
    min: {
      text: '',
      value: 0
    },
    meridiem: ''
  };
  clockOut = {
    hr: {
      text: '',
      value: 0
    },
    min: {
      text: '',
      value: 0
    },
    meridiem: ''
  };

  constructor(
    private modalCrl: ModalController,
    private userService: UserService,
    private dateTimeService: DateTimeService
  ) { }

  ngOnInit() {
    this.userLog$ = this.userService.getUserLog$();
    this.userService.getUserLog$().subscribe(log => {
      this.clockIn.hr.text = this.dateTimeService.display('hours', null, log.clockIn.toDate());
      this.clockIn.min.text = this.dateTimeService.display('minutes', null, log.clockIn.toDate());
      this.clockIn.meridiem = this.dateTimeService.getMeridiem(log.clockIn.toDate());
      this.clockOut.hr.text = this.dateTimeService.display('hours', null, log.clockOut.toDate());
      this.clockOut.min.text = this.dateTimeService.display('minutes', null, log.clockOut.toDate());
      this.clockOut.meridiem = this.dateTimeService.getMeridiem(log.clockOut.toDate());
    });
  }

  refreshLocation() {
    this.inFence = !this.inFence;
  }

  async openFenceHistory() {
    const fenceHistoryModal = await this.modalCrl.create({
      component: FenceHistoryPage
    });
    fenceHistoryModal.present();
  }

}
