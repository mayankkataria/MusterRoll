import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: any;
  user$: Observable<any>;
  picSrc: string;

  constructor(
    private userService: UserService
  ) {
    console.log('profile page constructor');
    this.picSrc = 'assets/user.png';
   }

  capturePhoto() {
    Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
      .then(photo => this.picSrc = photo.webPath)
      .catch(err => console.log('photo error: ', err));
  }

  ngOnInit() {
    this.user$ = this.userService.getUser$();
    this.user$.subscribe(data => console.log('user data: ', data));
  }

}
