import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from '../services/member.service';
import { DateTimeService } from '../services/date-time.service';
import { PopoverController, ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { UpdateMemberPage } from '../update-member/update-member.page';
import { AttendanceLogPage } from '../attendance-log/attendance-log.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.page.html',
  styleUrls: ['./others-profile.page.scss'],
})
export class OthersProfilePage implements OnInit {

  // @Input() memberUid: string;

  memberUid: string;
  attendancePage = AttendanceLogPage;
  member$: Observable<any>;
  memberData: any;
  userUid: string;
  
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
  userRole: string;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private dateTimeService: DateTimeService,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private modalController: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.memberUid = this.route.snapshot.params.uid;
    console.log('member uid: ', this.memberUid);

    this.userService.getUid$()
      .subscribe(uid => this.userUid = uid);

    this.userService.getURole$()
      .subscribe(role => this.userRole = role);
    this.member$ = this.memberService.getMember$(this.memberUid);
    this.member$.subscribe(memberData => {
      this.memberData = memberData;
      if (memberData && memberData.role === 'employee') {
        this.shiftStart.hr.text = this.dateTimeService.display('hours', memberData.shiftStart.hr);
        this.shiftStart.min.text = this.dateTimeService.display('minutes', memberData.shiftStart.min);
        this.shiftStart.meridiem = this.dateTimeService.getMeridiem(null, memberData.shiftStart.hr);
        this.shiftEnd.hr.text = this.dateTimeService.display('hours', memberData.shiftEnd.hr);
        this.shiftEnd.min.text = this.dateTimeService.display('minutes', memberData.shiftEnd.min);
        this.shiftEnd.meridiem = this.dateTimeService.getMeridiem(null, memberData.shiftEnd.hr);
      }
    });
  }

  removeMember() {
    this.router.navigate(['/tabs/members']);
    this.memberService.deleteMember(this.memberUid)
      .catch(err => console.log('firestore delete err: ', err));
    this.authService.deleteAccount(this.memberData.email, this.memberData.password)
      .catch(err => console.log('delete account error: ', err));
  }

  async updateMember() {
    const updateModal = await this.modalController.create({
      component: UpdateMemberPage,
      componentProps: { memberData: this.memberData },
      showBackdrop: true,
      animated: true
    });
    await updateModal.present();
  }

  async showAlert() {
    const alert =  await this.alertCtrl.create(
      {
      header: 'Sorry!',
      subHeader: 'You cannot delete your own profile!',
      buttons: ['OK']
    });
    alert.present();
  }

  async openSideMenu() {

    if (this.userUid != this.memberUid)
    {
    const sideMenu = await this.actionSheetController.create({
      mode: 'ios' || 'md',
      buttons: [
        {
          
        text: 'Remove Member',
        role: 'destructive',
        // icon: 'person-remove-outline',
        
        handler: () => this.removeMember()
      }, {

        // icon: 'person-add-outline',
        text: 'Update Member',
        role: 'destructive',
        // cssClass: "blue",
        handler: () => this.updateMember(),
      }]
    });
    await sideMenu.present();
  }
  else
  {
    const sideMenu = await this.actionSheetController.create({
      mode: 'ios' || 'md',
      buttons: [
        {
        text: 'Remove Member',
        role: 'destructive',
        // icon: 'person-remove-outline',
        handler: () => {this.showAlert();}
      }, {

        //icon: 'person-add-outline',
        text: 'Update Member',
        role: 'destructive',
        
        //cssClass: "blue",
        handler: () => this.updateMember(),
      }]
    });
    await sideMenu.present();
  }
  }
  }

