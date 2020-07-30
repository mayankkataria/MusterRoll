import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  membersColRef: AngularFirestoreCollection<any>;
  deptFilter$ = new BehaviorSubject(null);
  desFilter$ = new BehaviorSubject(null);

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
  }

  filter() {
    return combineLatest([
      this.deptFilter$,
      this.desFilter$
    ]).pipe(
      switchMap(([deptOption, desOption]) =>
        this.afs.collection<any>('members', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (deptOption !== 'all') {
            query = query.where('department', '==', deptOption);
          } else {
            query = query.limit(10);
          }
          if (desOption !== 'all') {
            query = query.where('designation', '==', desOption);
          } else {
            query = query.limit(10);
          }
          return query;
        }).valueChanges()
      )
    );
  }

  showSearchResults(searchFieldText: string) {
    return this.afs.collection<any>('members', ref => ref
      .orderBy('firstname')
      .startAt(searchFieldText)
      .endAt(searchFieldText + '\uf8ff')
      .limit(10))
      .valueChanges();
  }
}
