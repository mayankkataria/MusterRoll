import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, tap, switchMap } from 'rxjs/operators';
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
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    console.log('user service constructor');
   }

   getUser$() {
     return this.afAuth.authState
      .pipe(
        map(user => user.uid),
        switchMap(uid => this.afs.doc<any>('members/' + uid).valueChanges())
      );
   }
}
