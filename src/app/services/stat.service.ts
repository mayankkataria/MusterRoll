import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, map } from 'rxjs/operators';

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

}
