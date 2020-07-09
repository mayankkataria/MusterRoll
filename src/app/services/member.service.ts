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
    this.afs.doc('members/' + memberDetails.uid).set(memberDetails);
  }

  getMember$(uid: string): Observable<any> {
    console.log('get member');
    return this.afs.doc<any>('members/' + uid).valueChanges();
  }
}
