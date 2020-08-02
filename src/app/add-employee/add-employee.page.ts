import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MemberService } from '../services/member.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

  public employeeForm: FormGroup;
  shiftStart: any;
  shiftEnd: any;
  shiftStartPicker: any;
  shiftEndPicker: any;
  toast: any;

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private authService: AuthService,
    private toastController: ToastController,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      voiceId: [''],
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
      role: ['employee']
    });

    this.shiftStartPicker = {
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Done',
          handler: res => {
            const pickerObj = {
              hr: res.hour.value,
              min: res.minute.value
            };
            if (res.ampm.text === 'PM') {
              pickerObj.hr += 12;
            }
            this.shiftStart = pickerObj;
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
            const pickerObj = {
              hr: res.hour.value,
              min: res.minute.value
            };
            if (res.ampm.text === 'PM') {
              pickerObj.hr += 12;
            }
            this.shiftEnd = pickerObj;
          }
        }
      ]
    };
  }

  lowerCase(text: string) {
    return text.toLowerCase();
  }

  addEmployee() {
    const employeeDetails = this.employeeForm.value;
    employeeDetails.firstname = this.lowerCase(employeeDetails.firstname);
    employeeDetails.lastname = this.lowerCase(employeeDetails.lastname);
    employeeDetails.email = this.lowerCase(employeeDetails.email);
    employeeDetails.department = this.lowerCase(employeeDetails.department);
    employeeDetails.designation = this.lowerCase(employeeDetails.designation);
    this.http.get<any>('http://localhost:4201/create_user')
    .subscribe(resp => {
      console.log(resp);
      employeeDetails.voiceId = resp.userId;
      console.log('emp details: ', employeeDetails);
      this.authService.createEmpAccount(employeeDetails.email, employeeDetails.password)
      .then((data) => {
        employeeDetails.uid = data.user.uid;
        this.memberService.addMember(employeeDetails)
          .then(async () => {
            // this.authService.signOutEmp();
            this.toast = await this.toastController.create({
              message: 'Employee added successfully',
              duration: 3000
            });
            await this.toast.present();
            this.employeeForm.reset();
          })
          .catch(error => console.log('create member account error: ', error));
      });
    });
  }

  cancelBtn() {
    this.employeeForm.reset();
  }

}
