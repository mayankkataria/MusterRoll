import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  base64Regex = new RegExp('([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$');

  constructor(
    private afStorage: AngularFireStorage,
  ) {
  }

  testInput(re, str) {
    console.log('test ip');
    let midstring;
    if (re.test(str)) {
      midstring = 'contains';
      return true;
    } else {
      midstring = 'does not contain';
      return false;
    }
    // console.log('after if else: ', re.source);
    // console.log(`${str} ${midstring} ${re.source}`);
  }

  setProfilePic(memberUid: string, imgString) {
    const profilePicRef = this.afStorage.ref(`/${memberUid}/images/profile-pic.png`);
    // console.log('img str: ', imgString);
    // console.log('check format: ', this.base64Regex.test(imgString));
    // console.log('test ip: ', this.testInput(/[A-Za-z0-9+/=]/, imgString));

    // this.testInput(/([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/, imgString);
    // const isBase64 = this.base64Regex.test(imgString);

    try {
      console.log('try block');
      return profilePicRef.putString(imgString, 'data_url', {
        contentType: 'image/png'
      });
    } catch (err) {
      console.log('catch block');
      console.log('err: ', err);
      return profilePicRef.putString(imgString, 'base64', {
        contentType: 'image/png'
      });
    }
  }

  getProfilePicUrl$(memberUid: string) {
    const profilePicRef = this.afStorage.ref(`/${memberUid}/images/profile-pic.png`);
    return profilePicRef.getDownloadURL();
  }

  deleteProfilePic(memberUid: string) {
    const profilePicRef = this.afStorage.ref(`/${memberUid}/images/profile-pic.png`);
    profilePicRef.delete();
  }

  deleteMember(memberUid: string) {
    const memberRef = this.afStorage.ref(`/${memberUid}`);
    return memberRef.delete();
  }

}
