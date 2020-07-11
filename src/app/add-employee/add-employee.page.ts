import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MemberService } from '../services/member.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
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
      salary: ['', Validators.required],
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
              min: res.minute.value,
              meridiem: res.ampm.text
            };
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
              min: res.minute.value,
              meridiem: res.ampm.text
            };
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
    console.log('emp details: ', employeeDetails);
    this.authService.createAccount(employeeDetails.email, employeeDetails.password)
      .then((data) => {
        employeeDetails.uid = data.user.uid;
        this.memberService.addMember(employeeDetails);
        this.employeeForm.reset();
      })
      .catch(error => console.log('create member account error: ', error));
  }

  cancelBtn() {
    this.employeeForm.reset();
  }

}
