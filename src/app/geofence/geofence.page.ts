/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
const { Geolocation } = Plugins;

import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.page.html',
  styleUrls: ['./geofence.page.scss'],
})
export class GeofencePage implements OnInit {
  locations: Observable<any>;
  checkLocation: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;
  geofenceCollection: AngularFirestoreCollection<any>;
  user = null;

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: any;
  markers = [];

  listenerHandle: any;
  path = [];
  latLngArray = [];
  fence: any;
  infoWindow: any;
  allFences = [];
  isTracking = false;
  isCreating = false;
  isEditing = false;
  isVisible = false;
  optionsVisible = false;
  watch = null;
  isModified = false;
  fenceId: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.anonLogin();
   }

  ngOnInit() {
    this.geofenceCollection = this.afs.collection('geofences');
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  loadMap() {
    const latLng = new google.maps.LatLng(24.622102, 73.708055);

    const mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  anonLogin() {
    this.afAuth.signInAnonymously().then(ref => {
      this.user = ref.user;
      // console.log('user: ', this.user);

      this.locationsCollection = this.afs.collection(
        'locations/${this.user.uid}/track',
        // tslint:disable-next-line: no-shadowed-variable
        ref => ref.orderBy('timestamp')
      );

      // load firebase data
      this.locations = this.locationsCollection.snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
      // update map
      this.locations.subscribe(locations => {
        // console.log('new locations: ', locations);
        // this.updateMap(locations);
      });
    });
  }

  updateMap(locations) {
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];

    for (const loc of locations) {
      const latLng = new google.maps.LatLng(loc.lat, loc.lng);

      const marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.DROP,
        map: this.map
      });
      this.markers.push(marker);
    }
  }

  addNewLocation(lat, lng, timestamp) {
    this.locationsCollection.add({
      lat,
      lng,
      timestamp
    });

    const position = new google.maps.LatLng(lat, lng);
    this.map.setCenter(position);
    this.map.setZoom(15);
  }

  startTracking() {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      // console.log('new position: ', position);
      if (position) {
        this.inOrOut(position.coords.latitude, position.coords.longitude);
        this.addNewLocation(
          position.coords.latitude,
          position.coords.longitude,
          position.timestamp
        );
      }
    });
  }

  stopTracking() {
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
    });
  }

  deleteLocation(pos) {
    this.locationsCollection.doc(pos.id).delete();
  }

  addNewCoords(obj) {
    this.fenceId = this.afs.createId();
    this.geofenceCollection.doc(this.fenceId).set({obj, department: 'IT', id: this.fenceId});
  }

  showFences() {
    this.isVisible = true;
    // console.log(this.afs.collection('geofences').get());
    this.afs.collection<any>('geofences', ref => ref.where('department', '==', 'IT'))
    .valueChanges()
    .pipe(first())
    .subscribe(data => {
      data.forEach(fenceData => {
        fenceData.obj.forEach(coord => {
          this.path.push(new google.maps.LatLng(coord));
        });
        console.log('Inside showFences', this.path);
        this.createFence();
        this.fence.setEditable(false);
      });
    });
  }

  hideFences() {
    this.isVisible = false;
    this.allFences.forEach(fence => {
      fence.setMap(null);
    });
    this.allFences = [];
  }

  editGeofence() {
    this.isCreating = true;
    this.listenerHandle = this.map.addListener('click', mapsMouseEvent => {
      const coord = mapsMouseEvent.latLng;
      this.placeMarker(coord);
    });
  }

  createFenceObj() {
    this.fence = new google.maps.Polygon({
      paths: this.path,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.4,
      editable: true
    });
  }

  createFence() {
    this.createFenceObj();
    this.path = [];
    this.fence.setMap(this.map);
    this.fence.addListener('mouseover', this.showInfo);
    this.fence.addListener('mouseout', this.hideInfo);
    this.fence.addListener('click', event => {
      console.log(event);
      this.optionsVisible = true;
      this.afs.collection<any>('geofences')
      .valueChanges()
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        for (const fenceData of data) {
          const path = [];
          fenceData.obj.forEach(coord => {
            path.push(new google.maps.LatLng(coord));
          });
          const fence = new google.maps.Polygon({
            paths: path,
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0000FF',
            fillOpacity: 0.4,
            editable: true
          });
          const ltlg = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
          const result = google.maps.geometry.poly.containsLocation(ltlg, fence);
          console.log(result);
          if (result) {
            // this.fence = fence;
            this.fenceId = fenceData.id;
            console.log(this.fenceId);
            break;
          }
        }
      });
    });
    this.allFences.push(this.fence);
    // console.log('All Fences', this.allFences);
  }

  hideInfo() {
    this.infoWindow.close();
  }

  showInfo() {
    this.infoWindow = new google.maps.InfoWindow();
    const contentString = 'IT Department';
    const bounds = new google.maps.LatLngBounds();
    let i;

    // Bring coords from db here
    // The Bermuda Triangle
    const polygonCoords = [
      new google.maps.LatLng(24.62232045897288, 73.70660660713197),
      new google.maps.LatLng(24.623144610489263, 73.70775995700838),
      new google.maps.LatLng(24.62255453806249, 73.70899377315523),
      new google.maps.LatLng(24.621666985861314, 73.70841978042604),
      new google.maps.LatLng(24.6217255059807, 73.70738444774629)
    ];

    for (i = 0; i < polygonCoords.length; i++) {
      bounds.extend(polygonCoords[i]);
    }

    // The Center of the Bermuda Triangle - (25.3939245, -72.473816)
    const center = bounds.getCenter();
    // console.log(bounds.getCenter());

    // Set the info window's content and position.
    this.infoWindow.setContent(contentString);
    this.infoWindow.setPosition(center);

    this.infoWindow.open(this.map);
  }

  modifyFence() {
    console.log(this.fence);
    this.allFences[0].setEditable(true);
    this.isCreating = true;
    this.isEditing = true;
    this.isModified = true;
  }

  deleteFence() {
    console.log('delete fence');
    // console.log(this.fenceId);
    this.geofenceCollection.doc<any>(this.fenceId).delete();
    this.optionsVisible = false;
    this.path = [];
    this.hideFences();
    this.sleep(1000).then(() => {this.showFences(); });
    this.isCreating = false;
    this.isEditing = false;
  }

  placeGeofence() {
    google.maps.event.removeListener(this.listenerHandle);
    this.isEditing = true;
    // console.log('Inside placeGeofence', this.path);
    this.createFence();
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  saveGeofence() {
    // if (this.isModified) {
    //   this.deleteFence();
    //   this.isModified = false;
    // }
    this.fence.setEditable(false);
    this.isCreating = false;
    this.isEditing = false;
    this.optionsVisible = false;
    this.getFenceCoords();
    // console.log(this.latLngArray);
    this.addNewCoords(this.latLngArray);
    this.latLngArray = [];
  }

  getFenceCoords() {
    this.fence.getPath().getArray().forEach(coord => {
      const lat = coord.lat();
      const lng = coord.lng();
      this.latLngArray.push({lat, lng});
    });
  }

  placeMarker(latLng) {
    this.path = this.path.concat(latLng);
    // console.log(this.path);
    const marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.BOUNCE,
      map: this.map
    });
    this.markers.push(marker);
  }

  inOrOut(lat, lng) {
    // Get respective fence for a user from db
    const path = [
      { lat: 24.62232045897288, lng: 73.70660660713197},
      { lat: 24.623144610489263, lng: 73.70775995700838},
      { lat: 24.62255453806249, lng: 73.70899377315523},
      { lat: 24.621666985861314, lng: 73.70841978042604},
      { lat: 24.6217255059807, lng: 73.70738444774629}
    ];
    const fence = new google.maps.Polygon({
      paths: path,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.4
    });
    // fence.setMap(this.map);
    const result = google.maps.geometry.poly.containsLocation(new google.maps.LatLng(lat, lng), fence);
    if (result) {
      console.log('Inside Geofence');
    } else {
      console.log('Outside Geofence');
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
