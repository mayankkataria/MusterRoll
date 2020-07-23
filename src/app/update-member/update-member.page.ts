import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from '../services/member.service';
import { AuthService } from '../services/auth.service';
import { DateTimeService } from '../services/date-time.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.page.html',
  styleUrls: ['./update-member.page.scss'],
})
export class UpdateMemberPage implements OnInit {

  @Input()
  memberData: any;

  public memberForm: FormGroup;
  shiftStartNg: any;
  shiftEndNg: any;
  shiftStartPicker: any;
  shiftEndPicker: any;
  shiftStartObj: {};
  shiftEndObj: {};
  memberDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private authService: AuthService,
    private dateTimeService: DateTimeService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.memberForm = this.formBuilder.group({
      uid: [''],
      id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      shift: ['morning'],
      shiftStart: [{}, Validators.required],
      shiftEnd: [{}, Validators.required],
      salary: [0, Validators.required],
      perUnitTime: ['min'],
      role: ['member']
    });

    this.memberForm.patchValue(this.memberData);

    const shiftStartHrText = this.dateTimeService.display('hours', this.memberData.shiftStart.hr);
    const shiftStartMinText = this.dateTimeService.display('minutes', this.memberData.shiftStart.min);
    const shiftEndHrText = this.dateTimeService.display('hours', this.memberData.shiftEnd.hr);
    const shiftEndMinText = this.dateTimeService.display('minutes', this.memberData.shiftEnd.min);

    // tslint:disable-next-line: max-line-length
    this.shiftStartNg = `${shiftStartHrText}:${shiftStartMinText}`;
    this.shiftEndNg = `${shiftEndHrText}:${shiftEndMinText}`;

    this.shiftStartObj = this.memberData.shiftStart;
    this.shiftEndObj = this.memberData.shiftEnd;

    console.log('member form val: ', this.memberForm.value);
    console.log('shift start ng: ', this.shiftStartNg);

    this.shiftStartPicker = {
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Done',
          handler: res => {
            console.log('res: ', res);
            const pickerObj = {
              hr: res.hour.value,
              min: res.minute.value
            };
            if (res.ampm.text === 'PM') {
              pickerObj.hr += 12;
            }
            // this.memberForm.patchValue({
            //   shiftStart: {
            //     hr: res.hour.value,
            //     min: res.minute.value
            //   }
            // });
            this.shiftStartObj = {...pickerObj};
            console.log('pickerObj: ', pickerObj);
            console.log('shiftStartObj: ', this.shiftStartObj);
            // this.shiftStartNg = pickerObj;
          }
        }
      ]
    };

    this.shiftEndPicker = {
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Done',
          handler: res => {
            console.log('res: ', res);
            const pickerObj = {
              hr: res.hour.value,
              min: res.minute.value
            };
            if (res.ampm.text === 'PM') {
              pickerObj.hr += 12;
            }
            // this.memberForm.patchValue({
            //   shiftStart: {
            //     hr: res.hour.value,
            //     min: res.minute.value
            //   }
            // });
            // this.memberForm.value.shiftEnd = pickerObj;
            this.shiftEndObj = {...pickerObj};
          }
        }
      ]
    };
  }

  lowerCase(text: string) {
    return text.toLowerCase();
  }

  shiftStartChange() {
    console.log('shift start ng: ', this.shiftStartNg);
  }

  shiftEndChange() {
    console.log('shift end ng: ', this.shiftEndNg);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async showUpdateToast() {
    const updateToast = await this.toastController.create({
      message: 'Updated Successfully',
      duration: 3000
    });
  }

  updateMember() {
    this.memberDetails = this.memberForm.value;
    this.memberDetails.firstname = this.lowerCase(this.memberDetails.firstname);
    this.memberDetails.lastname = this.lowerCase(this.memberDetails.lastname);
    this.memberDetails.email = this.lowerCase(this.memberDetails.email);
    this.memberDetails.department = this.lowerCase(this.memberDetails.department);
    this.memberDetails.designation = this.lowerCase(this.memberDetails.designation);
    this.memberDetails.shiftStart = {...this.shiftStartObj};
    this.memberDetails.shiftEnd = {...this.shiftEndObj};
    console.log('emp details: ', this.memberDetails);
    this.memberService.updateMember(this.memberDetails)
      .then(() => {
        this.showUpdateToast();
        this.closeModal();
      })
      .catch(err => console.log('Update error: ', err));

  //   this.authService.createEmpAccount(memberDetails.email, memberDetails.password)
  //     .then((data) => {
  //       memberDetails.uid = data.user.uid;
  //       this.memberService.addMember(memberDetails)
  //         .then(async () => {
  //           // this.authService.signOutEmp();
  //           this.memberForm.reset();
  //         });
  //     })
  //     .catch(error => console.log('create member account error: ', error));
  }
}

