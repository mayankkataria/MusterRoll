import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit, OnDestroy {

  email: string;
  password: string;
  loginSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginSubscription = this.authService.loginStatus$()
      .subscribe(loggedIn => {
        if (loggedIn) {
          this.authService.signOut();
        }
      });
  }
  change() {
    console.log('email: ', this.email);
  }

  ngOnDestroy() {
    console.log('sign in ngOnDestroy');
    this.loginSubscription.unsubscribe();
  }

  signIn() {
    this.loginSubscription.unsubscribe();
    this.authService.signIn(this.email, this.password)
      .then(() => {
        this.router.navigate(['tabs']);
      })
      .catch(error => console.log('cant sign in, error: ', error));
  }

}
