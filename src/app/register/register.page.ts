import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  adminForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      uid: [''],
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      orgName: ['', Validators.required],
      role: ['admin'],
    });
  }

  register() {
    const adminDetails = this.adminForm.value;
    this.authService.createAccount(adminDetails.email, adminDetails.password)
      .then((data) => {
        this.router.navigate(['tabs']);
        adminDetails.uid = data.user.uid;
        this.memberService.addMember(adminDetails);
      })
      .catch(error => console.log('create member account error: ', error));
  }

}
