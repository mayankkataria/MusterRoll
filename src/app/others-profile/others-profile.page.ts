import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.page.html',
  styleUrls: ['./others-profile.page.scss'],
})
export class OthersProfilePage implements OnInit {

  memberUid: string;
  member$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.memberUid = this.route.snapshot.params.uid;
    this.member$ = this.memberService.getMember$(this.memberUid);
  }

}
