import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signIn(this.email, this.password)
      .then(() => {
        setTimeout(() => {
          this.router.navigate(['tabs']);
        }, 3000);
      })
      .catch(error => console.log('cant sign in, error: ', error));
  }

}
