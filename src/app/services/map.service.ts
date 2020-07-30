import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  showMap() {}

  fetchCurrentLoc() {}

  trackMe() {}

  putMarker(latLng: any) {}

  addFence(latLng: [{lat: any, lng: any}]) {}

  getFence() {}

  updateFence(latLng: [{lat: any, lng: any}]) {}

  deleteFence() {}

  getFenceStatus(): boolean { return true; }

}
