import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
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
    // this.getUid$()
    //   .subscribe(uid => {
    //     this.storageService.getProfilePicUrl$(uid)
    //       .subscribe(
    //         res => console.log('res: ', res),
    //         err => this.deleteProfilePic()
    //       );
    //   });
  }

  getUser$() {
    console.log('get User$');
    return this.getUid$()
      .pipe(switchMap(uid => {
        console.log('uid: ', uid);
        return this.afs.doc<any>('members/' + uid).valueChanges();
      }));
  }

  getUid$() {
    console.log('get uid$');
    return this.afAuth.authState
      .pipe(
        map(user => {
          if (user) {
            return user.uid;
          }
        })
      );
  }

  getUserLogs$() {
    return this.getUid$()
      .pipe(switchMap(uid => this.afs.collection<any>('members/' + uid + '/log', ref => ref
        .orderBy('date', 'desc')
      )
        .valueChanges()));
  }

  getUserLog$() {
    return this.getUid$()
      .pipe(switchMap(uid => this.afs.collection<any>('members/' + uid + '/log', ref => ref
        .orderBy('date', 'desc')
        .limit(1)
      )
        .valueChanges()))
      .pipe(switchMap(firstDoc => firstDoc));
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

  setMergeDateLog(dateLog: any) {
    this.getUid$()
      .subscribe(uid => {
        console.log('get uid subscribe');
        this.afs.doc<any>(`members/${uid}/log/${dateLog.date.toDateString()}`)
          .set(dateLog, { merge: true });
      });
  }

  getURole$() {
    console.log('get urole$');
    return this.getUser$()
      .pipe(
        map(userData$ => userData$.role)
        );
  }
}
