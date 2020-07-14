import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from '../services/member.service';
import { DateTimeService } from '../services/date-time.service';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.page.html',
  styleUrls: ['./others-profile.page.scss'],
})
export class OthersProfilePage implements OnInit {

  memberUid: string;
  member$: Observable<any>;
  shiftStart = {
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
  shiftEnd = {
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
    private route: ActivatedRoute,
    private memberService: MemberService,
    private dateTimeService: DateTimeService
  ) { }

  ngOnInit() {
    this.memberUid = this.route.snapshot.params.uid;
    this.member$ = this.memberService.getMember$(this.memberUid);
    this.member$.subscribe(memberData => {
      this.shiftStart.hr.text = this.dateTimeService.display('hours', memberData.shiftStart.hr);
      this.shiftStart.min.text = this.dateTimeService.display('minutes', memberData.shiftStart.min);
      this.shiftStart.meridiem = this.dateTimeService.getMeridiem(null, memberData.shiftStart.hr);
      this.shiftEnd.hr.text = this.dateTimeService.display('hours',memberData.shiftEnd.hr);
      this.shiftEnd.min.text = this.dateTimeService.display('minutes', memberData.shiftEnd.min);
      this.shiftEnd.meridiem = this.dateTimeService.getMeridiem(null, memberData.shiftEnd.hr);
    });
  }

}
