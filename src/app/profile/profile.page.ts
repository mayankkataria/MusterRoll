import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { md5 } from 'crypto-md5';
import { StorageService } from '../services/storage.service';
import { CameraService } from '../services/camera.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: any;
  user$: Observable<any>;
  profilePicUrl: any;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private camService: CameraService
  ) {
    console.log('profile page constructor');
   }

  ngOnInit() {
    this.user$ = this.userService.getUser$();
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
