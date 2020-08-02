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

  formErrors = {
    id: '',
    firstname: '',
    lastname: '',
    orgName: '',
    department: '',
    designation: '',
    email: '',
    password: ''
  };

  validationMessages = {
    id: {
      required: 'ID is required.'
    },
    firstname: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.'
    },
    lastname: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      maxlength: 'Last Name cannot be more than 25 characters long.'
    },
    orgName: {
      required: 'Organisation\'s name is required'
    },
    department: {
      required: 'Department is required'
    },
    designation: {
      required: 'Designation is required'
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.'
    },
    password: {
      required: 'Password is required'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      uid: [''],
      id: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      orgName: ['', Validators.required],
      role: ['admin'],
    });

    this.adminForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  lowerCase(text: string) {
    return text.toLowerCase();
  }

  async register() {
    const adminDetails = this.adminForm.value;
    adminDetails.firstname = this.lowerCase(adminDetails.firstname);
    adminDetails.lastname = this.lowerCase(adminDetails.lastname);
    adminDetails.email = this.lowerCase(adminDetails.email);
    adminDetails.department = this.lowerCase(adminDetails.department);
    adminDetails.designation = this.lowerCase(adminDetails.designation);
    try {
      const accData = await this.authService.createAdminAccount(adminDetails.email, adminDetails.password);
      adminDetails.uid = accData.user.uid;
      await this.memberService.addMember(adminDetails);
      await this.authService.signIn(adminDetails.email, adminDetails.password);
      this.router.navigate(['tabs']);
      console.log('account created');
    } catch (err) {
      console.log('create admin acc err: ', err);
    }

    // .then((data) => {
    //   this.router.navigate(['tabs']);
    //   adminDetails.uid = data.user.uid;
    //   this.memberService.addMember(adminDetails);
    // })
    // .catch(error => console.log('create member account error: ', error));
  }

  onValueChanged(data?: any) {
    if (!this.adminForm) { return; }
    const form = this.adminForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }

}
