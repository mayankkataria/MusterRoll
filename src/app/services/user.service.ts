import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
    private afs: AngularFirestore
  ) {
    console.log('user service constructor');
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
}
