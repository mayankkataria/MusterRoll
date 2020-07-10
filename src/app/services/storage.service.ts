import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private afStorage: AngularFireStorage
  ) { }

  setProfilePic(memberUid: string, base64Str) {
    const profilePicRef = this.afStorage.ref(`/${memberUid}/images/profile-pic.png`);
    return profilePicRef.putString(base64Str, 'base64', {
      contentType: 'image/png'
    });
  }

  getProfilePicUrl$(memberUid: string) {
    const profilePicRef = this.afStorage.ref(`/${memberUid}/images/profile-pic.png`);
    return profilePicRef.getDownloadURL();
  }

}
