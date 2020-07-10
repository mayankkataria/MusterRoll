import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: any;
  userData$: Observable<any>;
  userRole: string;
  userUID: string;
  userRef: AngularFirestoreDocument<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storageService: StorageService
  ) {
    console.log('user service constructor');
    this.getUid$()
      .subscribe(uid => {
        this.storageService.getProfilePicUrl$(uid)
          .subscribe(
            res => console.log('res: ', res),
            err => this.deleteProfilePic()
          );
      });
  }

  getUser$() {
    return this.getUid$()
      .pipe(switchMap(uid => this.afs.doc<any>('members/' + uid).valueChanges()));
  }

  getUid$() {
    return this.afAuth.authState
      .pipe(
        map(user => user.uid)
      );
  }

  updateProfilePic(url: any) {
    this.getUid$()
      .subscribe(uid => {
        console.log('get uid subscribe');
        this.afs.doc<any>('members/' + uid).update({ profilePicUrl: url });
      });
  }

  deleteProfilePic() {
    this.getUid$()
      .subscribe(uid => {
        console.log('get uid subscribe');
        this.afs.doc<any>('members/' + uid).update({
          profilePicUrl: firebase.firestore.FieldValue.delete()
        });
      });
  }
}
