import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private afs: AngularFirestore
  ) { }

  showMap() {}

  fetchCurrentLoc() {}

  trackMe() {}

  putMarker(latLng: any) {}

  addFence(latLng: [{lat: any, lng: any}]) {}

  getFence() {}

  updateFence(latLng: [{lat: any, lng: any}]) {}

  deleteFence() {}

  getFenceStatus(): boolean { return true; }

  updateFenceStatus(empId: string, fenceStatus: boolean) {
    this.afs.doc<any>(`members/${empId}`).set(fenceStatus, {merge: true});
  }

}
