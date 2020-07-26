import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  membersColRef: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.membersColRef = afs.collection<any>('members');
  }

  fetchAllMembers$(): Observable<any> {
    return this.membersColRef.valueChanges();
  }

  addMember(memberDetails: any) {
    console.log('add member');
    return this.afs.doc('members/' + memberDetails.uid).set(memberDetails);
  }

  deleteMember(memberUid: string) {
    console.log('delete member');
    return this.afs.doc(`members/${memberUid}`).delete();
  }

  updateMember(memberDetails: any) {
    console.log('update member');
    return this.afs.doc(`members/${memberDetails.uid}`).set(memberDetails, {merge: true});
  }

  getMember$(uid: string): Observable<any> {
    console.log('get member $');
    return this.afs.doc<any>('members/' + uid)
    .valueChanges();
  }

  getTodayStatus$() {
    console.log('get today status $');
    return this.afs.collection<any>('today_status', ref => ref
    .orderBy('recentDate')
    )
    .valueChanges();
  }

  setMergeTodaysLog(todaysLog: any, uid: string) {
    this.afs.doc<any>(`today_status/${uid}`)
      .set(todaysLog, { merge: true });
  //   this.getUid$()
  //     .subscribe(uid => {
  //       console.log('get uid subscribe');
  //       this.afs.doc<any>(`members/${uid}/log/${dateLog.date.toDateString()}`)
  //         .set(dateLog, { merge: true });
  //     });
  }
}
