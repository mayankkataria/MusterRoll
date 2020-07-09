import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: any;
  user$: Observable<any>;

  constructor(
    public photoService: PhotoService,
    private userService: UserService
  ) {
    console.log('profile page constructor');
   }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  ngOnInit() {
    this.user$ = this.userService.getUser$();
    this.user$.subscribe(data => console.log('user data: ', data));
  }

}
