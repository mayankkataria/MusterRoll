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
      shift: ['', Validators.required],
      shiftTime: ['', Validators.required],
      salary: ['', Validators.required],
      perUnitTime: ['min', Validators.required],
      role: ['employee']
    });
  }

  addEmployee() {
    const employeeDetails = this.employeeForm.value;
    this.authService.createAccount(employeeDetails.email, employeeDetails.password)
      .then((data) => {
        employeeDetails.uid = data.user.uid;
        this.memberService.addMember(employeeDetails);
      })
      .catch(error => console.log('create member account error: ', error));
    this.employeeForm.reset();
  }

}
