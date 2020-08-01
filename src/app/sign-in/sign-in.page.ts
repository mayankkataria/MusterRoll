import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit, OnDestroy {

  email: string;
  password: string;
  loginSubscription: Subscription;
  platform: string;

  constructor(
    private loadingCtrl:LoadingController,
    private authService: AuthService,
    private router: Router,
    private plt: Platform
  ) { }

  ngOnInit() {
    this.loginSubscription = this.authService.loginStatus$()
      .subscribe(loggedIn => {
        if (loggedIn) {
          this.authService.signOut();
        }
      });

  }

  ngOnDestroy() {
    console.log('sign in ngOnDestroy');
    this.loginSubscription.unsubscribe();
  }

   async signIn() {
    let loading = await this.loadingCtrl.create({
      message:"Signing in..",
      // duration:5000,
      spinner:"bubbles",
      // showBackdrop:false,
      // backdropDismiss:true
    });
    // loading.present();
    setTimeout(() =>{
      loading.dismiss();
    },4000)

    // .then((loading) =>{
    //   loading.present();

    //   setTimeout(() =>{
    //     loading.dismiss();
    //   },5000)
    // })
    this.loginSubscription.unsubscribe();
    this.authService.signIn(this.email, this.password)
      .then(() => {
        loading.present();
        this.router.navigate(['tabs']);
        // if (this.plt.is('mobile')) {
        //   this.router.navigate(['tabs']);
        // } else if (this.plt.is('desktop')) {
        //   this.router.navigate(['side-menu']);
        // }
      })
      .catch(error => console.log('cant sign in, error: ', error));
  }

}
