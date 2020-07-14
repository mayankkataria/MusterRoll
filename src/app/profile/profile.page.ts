import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { md5 } from 'crypto-md5';
import { StorageService } from '../services/storage.service';
import { CameraService } from '../services/camera.service';
import { catchError } from 'rxjs/operators';
import { DateTimeService } from '../services/date-time.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: any;
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
    private dateTimeService: DateTimeService
  ) {
    console.log('profile page constructor');
   }

  ngOnInit() {
    this.user$ = this.userService.getUser$();
    this.user$.subscribe(userData => {
      this.shiftStart.hr.text = this.dateTimeService.display('hours', userData.shiftStart.hr);
      this.shiftStart.min.text = this.dateTimeService.display('minutes', userData.shiftStart.min);
      this.shiftStart.meridiem = this.dateTimeService.getMeridiem(null, userData.shiftStart.hr);
      this.shiftEnd.hr.text = this.dateTimeService.display('hours', userData.shiftEnd.hr);
      this.shiftEnd.min.text = this.dateTimeService.display('minutes', userData.shiftEnd.min);
      this.shiftEnd.meridiem = this.dateTimeService.getMeridiem(null, userData.shiftEnd.hr);
    });
  }

  capturePhoto() {
    this.camService.capturePhoto()
      .then(photo => {
        this.userService.getUid$()
          .subscribe(userUid => {
            console.log('uid subscribe');
            const base64String = photo.base64String;
            this.storageService.setProfilePic(userUid, base64String)
            .then(() => {
              this.storageService.getProfilePicUrl$(userUid)
                .subscribe(url => {
                  this.profilePicUrl = url;
                  this.userService.updateProfilePic(url);
                });
            })
            .catch(err => console.log('img store error: ', err));
          });
      })
      .catch(err => console.log('capture photo error: ', err));
  }

}
