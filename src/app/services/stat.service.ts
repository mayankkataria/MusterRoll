import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, map, first } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getStats$() {
    return this.afs.collection<any>('statistics', ref => ref
      .orderBy('date')
    )
      .valueChanges();
    // .pipe(switchMap(latestStats => latestStats));
  }

  getStatsRange$(from: Date, to: Date) {
    console.log('from: ', from);
    console.log('to: ', to);
    return this.afs.collection<any>('statistics', ref => ref
      .orderBy('date')
      // .startAt(from)
      // .endAt(to)
      .where('date', '>=', from)
      .where('date', '<=', to)
    )
      .valueChanges();
    // .pipe(switchMap(latestStats => latestStats));
  }

  getDateStat$(date: Date) {
    return this.afs.collection<any>('statistics', ref => ref
      .where('date', '==', date)
      // .orderBy('date')
      // .startAt(from)
      // .endAt(to)
      // .where('date', '>=', from)
      // .where('date', '<=', to)
    )
      .valueChanges()
      .pipe(switchMap(dateStat => dateStat));
  }

  decrementAbsentee(date: Date) {
    console.log('decrement absentee');

    this.afs.collection<any>('statistics', ref => ref
      .where('date', '==', date)
    )
      .valueChanges({ idField: 'statId' })
      .pipe(
        map(data => data[0].statId),
        first()
        )
        .subscribe(statId => {
            return this.afs.doc<any>(`statistics/${statId}`).update({
              absentees: firebase.firestore.FieldValue.increment(-1)
            });
        });
  }

  incrementStats(date: Date, status: string) {

    console.log('increment stats');
    this.afs.collection<any>('statistics', ref => ref
      .where('date', '==', date)
    )
      .valueChanges({ idField: 'statId' })
      .pipe(
        map(data => data[0].statId),
        first()
        )
        .subscribe(statId => {
          if (status === 'late arrival') {
            return this.afs.doc<any>(`statistics/${statId}`).update({
              lateComers: firebase.firestore.FieldValue.increment(1)
            });
          } else if (status === 'early departure') {
            return this.afs.doc<any>(`statistics/${statId}`).update({
              earlyLeavers: firebase.firestore.FieldValue.increment(1)
            });
          } else {
            return this.afs.doc<any>(`statistics/${statId}`).update({
              presentees: firebase.firestore.FieldValue.increment(1)
            });
          }
        });

      // .subscribe(data => console.log('stat id data: ', data));

      // .pipe(map(statId => {
      //   console.log('stat id sent');
        // if (status === 'lateComers') {
        //   return this.afs.doc<any>(`statistics/${statId}`).update({
        //     lateComers: firebase.firestore.FieldValue.increment(1)
        //   });
        // } else if (status === 'earlyLeavers') {
        //   return this.afs.doc<any>(`statistics/${statId}`).update({
        //     earlyLeavers: firebase.firestore.FieldValue.increment(1)
        //   });
        // } else {
        //   return this.afs.doc<any>(`statistics/${statId}`).update({
        //     presentees: firebase.firestore.FieldValue.increment(1)
        //   });
        // }
      // }
      // ));

    // .subscribe(data => {
    //   console.log('data: ', data);

    // data.map(nestData => console.log('nested data: ', nestData.get()));
    // if (status === 'lateComers') {
    //   data.update({
    //     lateComers: firebase.firestore.FieldValue.increment(1)
    //   });
    // } else if (status === 'earlyLeavers') {
    //   data.update({
    //     earlyLeavers: firebase.firestore.FieldValue.increment(1)
    //   });
    // } else {
    //   data.update({
    //     presentees: firebase.firestore.FieldValue.increment(1)
    //   });
    // }

    // });

    // .subscribe(data => {
    //   if (status === 'late departure') {
    //     data.lateComers.FieldVa
    //   }
    // })
    // .subscribe(data => {
    //       console.log('data: ', data);
    //       // const absentIds = data.absentIds;
    //       // console.log('absent ids: ', absentIds);
    //       this.afs.collection<any>('members', ref => ref
    //       .orderBy('uid')
    //       .where('uid', 'in', 'absentIds')
    //       // .limit(10)
    //       )
    //       .valueChanges()
    //       .subscribe(filteredData => console.log('filtered data: ', filteredData));
    //     });
    //     .value
    //   const date = Date.now();
    //   if (status === 'present') {

    //   }
  }

}
