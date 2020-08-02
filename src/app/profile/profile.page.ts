import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { md5 } from 'crypto-md5';
import { StorageService } from '../services/storage.service';
import { CameraService } from '../services/camera.service';
import { catchError } from 'rxjs/operators';
import { DateTimeService } from '../services/date-time.service';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Capacitor } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AttendanceLogPage } from '../attendance-log/attendance-log.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  attendancePage = AttendanceLogPage;
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl = '/assets/user.png';
  isDesktop: boolean;

  roleFlag = true;
  userRole: string;
  userData: any;
  userUid: string;
  user$: Observable<any>;
  profilePicUrl: any;
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


  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private camService: CameraService,
    private dateTimeService: DateTimeService,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl:LoadingController
  ) {
    console.log('profile page constructor');
  }

  ngOnInit() {
    console.log('profile ng oninit');
    this.user$ = this.userService.getUser$();
    this.user$.subscribe(userData => {
      this.userUid = userData.uid;
      this.userRole = userData.role;
      if (this.userRole == 'admin')
      {
        this.roleFlag = true;
      }
      else
      {
        this.roleFlag = false;
      }

      console.log(this.userRole);
      if (userData && userData.role === 'employee') {
        this.shiftStart.hr.text = this.dateTimeService.display('hours', userData.shiftStart.hr);
        this.shiftStart.min.text = this.dateTimeService.display('minutes', userData.shiftStart.min);
        this.shiftStart.meridiem = this.dateTimeService.getMeridiem(null, userData.shiftStart.hr);
        this.shiftEnd.hr.text = this.dateTimeService.display('hours', userData.shiftEnd.hr);
        this.shiftEnd.min.text = this.dateTimeService.display('minutes', userData.shiftEnd.min);
        this.shiftEnd.meridiem = this.dateTimeService.getMeridiem(null, userData.shiftEnd.hr);
      }
    });
    if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;
    }
  }

  capturePhoto() {
    this.camService.capturePhoto()
      .then(photo => {
        // this.userService.getUid$()
        //   .subscribe(userUid => {
        console.log('uid subscribe');
        const base64String = photo.base64String;
        this.storageService.setProfilePic(this.userUid, base64String)
          .then(() => {
            this.storageService.getProfilePicUrl$(this.userUid)
              .subscribe(url => {
                this.profilePicUrl = url;
                this.userService.updateProfilePic(url);
              });
          })
          .catch(err => console.log('img store error: ', err));
        // });
      })
      .catch(err => console.log('capture photo error: ', err));
  }

  accessGallery() {
    if (!Capacitor.isPluginAvailable('Camera') || this.isDesktop) {
      this.filePickerRef.nativeElement.click();
      return;
    }
  }

  async showCamSheet() {
    const photoSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        handler: () => this.deleteImg()
      }, {
        text: 'Access Gallery',
        handler: () => this.accessGallery()
      }, {
        text: 'Camera',
        handler: () => this.capturePhoto()
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => console.log('cancel')
      }]
    });
    await photoSheet.present();
  }

  async showSettingsSheet() 
  {
    const photoSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [{
        text: 'Modify Geofence',
        handler: () => { this.router.navigate(['geofence'],{queryParams:{role:this.userRole}}); }
      }, {
        text: 'Sign Out',
        handler: () => this.signOut()
      }]
    });
    await photoSheet.present();
  }

  deleteImg() {
    this.userService.deleteProfilePic();
    this.storageService.deleteProfilePic(this.userUid);
  }

  onFileChoose(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('File format not supported');
      return;
    }

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.photo = reader.result.toString();
      // console.log('photo: ', this.photo);
      console.log('uid subscribe');
      this.storageService.setProfilePic(this.userUid, this.photo)
        .then(() => {
          this.storageService.getProfilePicUrl$(this.userUid)
            .subscribe(url => {
              this.profilePicUrl = url;
              this.userService.updateProfilePic(url);
            });
        })
        .catch(err => console.log('img store error: ', err));
    };


    console.log('file: ', file);

  }

  imgChanged() {
    console.log('img changed');
  }

  async signOut() {
    let loading = await this.loadingCtrl.create({
      message:"Signing out..",
      spinner:"bubbles",
    });
    await this.authService.signOut();
    loading.present();
    // setTimeout(() =>{
    //   loading.dismiss();
    // },4000)
    window.location.replace('/sign-in');
  }

  // constructor(
  //   private platform: Platform,
  //   private sanitizer: DomSanitizer) { }

  // ngOnInit() {
  // if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
  //   this.isDesktop = true;
  // }
  // }

  // async getPicture(type: string) {
  //   if (!Capacitor.isPluginAvailable('Camera') || (this.isDesktop && type === 'gallery')) {
  //     this.filePickerRef.nativeElement.click();
  //     return;
  //   }

  //   const image = await Camera.getPhoto({
  //     quality: 100,
  //     width: 400,
  //     allowEditing: false,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Prompt
  //   });

  //   this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  // }

  // onFileChoose(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   const pattern = /image-*/;
  //   const reader = new FileReader();

  //   if (!file.type.match(pattern)) {
  //     console.log('File format not supported');
  //     return;
  //   }

  //   reader.onload = () => {
  //     this.photo = reader.result.toString();
  //   };

  //   reader.readAsDataURL(file);

  // }

}