/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
const { Geolocation } = Plugins;
import {ActivatedRoute} from '@angular/router';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.page.html',
  styleUrls: ['./geofence.page.scss'],
})
export class GeofencePage implements OnInit {
  locations: Observable<any>;
  checkLocation: Observable<any>;
  geofenceCollection: AngularFirestoreCollection<any>;
  user = null;

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: any;
  markers = [];
  marker: any;
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
  fenceId: string;
  fullImagePath: string;
  msg: string;
  polyLine: any;
  currentLocation: any;
  isModified = false;
  fenceStatus: boolean;
  role: string="";
  userRole= true;
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore, 
    public toastController: ToastController,
    public activatedRoute: ActivatedRoute,
    private userService: UserService
    ) {
    //   this.activatedRoute.queryParams.subscribe((userRole) => {
    //   this.role = JSON.stringify(userRole.role);
    //   console.log(JSON.stringify(userRole.role));
    //   console.log(this.role);
    //   if (this.role == "employee")
    //   {
    //     this.userRole = false;
    //   }
    //   else
    //   {
    //     this.userRole = true;
    //   }
    //   console.log('ROLE: ',this.role);
    //   console.log('USER ROLE: ',this.userRole);
      }

  ngOnInit() {
    this.geofenceCollection = this.afs.collection('geofences');
    this.userLogin();
    this.user$ = this.userService.getURole$();
    this.user$.subscribe(userData => {
      this.role = userData;
      if (this.role == 'admin')
      {
        this.userRole = true;
      }
      else
      {
        this.userRole = false;
      }
    });
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  userLogin() {
    this.afAuth.authState
      .subscribe(user => this.user = user);
  }

  loadMap() {
    Geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.currentLocation = latLng;
      const mapOptions = {
        center: latLng,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.fullImagePath = '/assets/icon/man.png';
      this.marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.DROP,
        map: this.map,
        icon: this.fullImagePath
      });

      const infowindow = new google.maps.InfoWindow({
        content: 'Hi, there!'
      });
      this.marker.addListener('mouseover', () => {
        infowindow.open(this.map, this.marker);
      });
      this.marker.addListener('mouseout', () => {
        infowindow.close();
      });

      this.showFences();
      this.sleep(3000).then(() => {this.startTracking(); });
    });
  }

  reCenter() {
    console.log('Re-center karega, Re-center kr');
    this.map.setCenter(this.currentLocation);
  }

  startTracking() {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position) => {
      console.log('New Position: ', position);
      if (position) {
        this.inOrOut(position.coords.latitude, position.coords.longitude);
        this.currentLocationUpdate(position.coords);
      }
    });
  }

  inOrOut(lat, lng) {
    this.afs.collection<any>('geofences', ref => ref.where('department', '==', 'IT'))
    .valueChanges()
    .pipe(first())
    .subscribe(data => {
      const path = [];
      data.forEach(fenceData => {
        fenceData.obj.forEach(coord => {
          path.push(new google.maps.LatLng(coord));
        });
      });
      const fence = new google.maps.Polygon({
        paths: path
      });
      const result = google.maps.geometry.poly.containsLocation(new google.maps.LatLng(lat, lng), fence);
      // this.fenceStatus = result;
      this.presentToast(result);
    });
  }

  async presentToast(result) {
    if (result) {
      this.msg = 'Inside Geofence';
    } else {
      this.msg = 'Outside Geofence';
    }
    const toast = await this.toastController.create({
      message: this.msg,
      duration: 3000
    });
    toast.present();
  }

  currentLocationUpdate(coords) {
    const latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
    this.map.setCenter(latLng);

    this.marker.setMap(null);
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: this.fullImagePath
    });

    const infowindow = new google.maps.InfoWindow({
      content: 'You are here :)'
    });
    this.marker.addListener('mouseover', () => {
      infowindow.open(this.map, this.marker);
    });
    this.marker.addListener('mouseout', () => {
      infowindow.close();
    });
  }

  stopTracking() {
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
    });
  }

  createGeofence() {
    this.isCreating = true;
    this.listenerHandle = this.map.addListener('click', mapsMouseEvent => {
      const coord = mapsMouseEvent.latLng;
      this.placeMarker(coord);
    });
  }

  placeMarker(latLng) {
    this.path = this.path.concat(latLng);
    const marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.BOUNCE,
      map: this.map
    });
    this.markers.push(marker);
  }

  placeGeofence() {
    google.maps.event.removeListener(this.listenerHandle);
    this.isEditing = true;
    this.createFenceOnMap();
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  createFenceOnMap() {
    this.fence = new google.maps.Polygon({
      paths: this.path,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.4,
      editable: true
    });
    this.path = [];
    this.fence.setMap(this.map);
    this.fence.addListener('mouseover', event => {
      const bounds = new google.maps.LatLngBounds();
      this.afs.collection<any>('geofences', ref => ref.where('department', '==', 'IT'))
      .valueChanges()
      .pipe(first())
      .subscribe(data => {
        const path = [];
        data.forEach(fenceData => {
          fenceData.obj.forEach(coord => {
            path.push(new google.maps.LatLng(coord));
          });
        });
        let i;
        for (i = 0; i < path.length; i++) {
          bounds.extend(path[i]);
        }
        const center = bounds.getCenter();

        this.infoWindow = new google.maps.InfoWindow();
        const contentString = 'IT Department';
        this.infoWindow.setContent(contentString);
        this.infoWindow.setPosition(center);
        this.infoWindow.open(this.map);
      });
    });
    this.fence.addListener('mouseout', event => {
      this.infoWindow.close();
    });
    this.fence.addListener('click', event => {
      this.optionsVisible = true;
      this.afs.collection<any>('geofences')
      .valueChanges()
      .pipe(first())
      .subscribe(data => {
        for (const fenceData of data) {
          const path = [];
          fenceData.obj.forEach(coord => {
            path.push(new google.maps.LatLng(coord));
          });
          const fence = new google.maps.Polygon({
            paths: path
          });
          const ltlg = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
          const result = google.maps.geometry.poly.containsLocation(ltlg, fence);
          if (result) {
            this.fenceId = fenceData.id;
            console.log(result, 'Fence ID: ', this.fenceId);
            break;
          }
        }
      });
    });
    this.allFences.push(this.fence);
  }

  saveGeofence() {
    this.fence.setEditable(false);
    this.isCreating = false;
    this.isEditing = false;
    this.optionsVisible = false;
    if (this.isModified) {
      this.deleteGeofence();
    }
    this.fence.getPath().getArray().forEach(coord => {
      const lat = coord.lat();
      const lng = coord.lng();
      this.latLngArray.push({lat, lng});
    });
    this.addNewCoords(this.latLngArray);
    this.latLngArray = [];
  }

  addNewCoords(obj) {
    this.fenceId = this.afs.createId();
    this.geofenceCollection.doc(this.fenceId).set({obj, department: 'IT', id: this.fenceId});
  }

  deleteGeofence() {
    this.geofenceCollection.doc<any>(this.fenceId).delete();
    this.optionsVisible = false;
    this.isCreating = false;
    this.isEditing = false;
    this.hideFences();
    this.sleep(1000).then(() => {this.showFences(); });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showFences() {
    this.isVisible = true;
    this.afs.collection<any>('geofences', ref => ref.where('department', '==', 'IT'))
    .valueChanges()
    .pipe(first())
    .subscribe(data => {
      data.forEach(fenceData => {
        fenceData.obj.forEach(coord => {
          this.path.push(new google.maps.LatLng(coord));
        });
        this.createFenceOnMap();
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

  modifyFence() {
    // console.log(this.fence);
    this.allFences[0].setEditable(true);
    this.isCreating = true;
    this.isEditing = true;
    this.isModified = true;
  }

  checkStatus() {
    this.stopTracking();
    this.sleep(1000).then(() => {this.startTracking(); });
  }

  // async presentActionSheet() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Albums',
  //     cssClass: 'my-custom-class',
  //     buttons: [{
  //       text: 'Delete',
  //       role: 'destructive',
  //       icon: 'trash',
  //       handler: () => {
  //         console.log('Delete clicked');
  //       }
  //     }, {
  //       text: 'Share',
  //       icon: 'share',
  //       handler: () => {
  //         console.log('Share clicked');
  //       }
  //     }, {
  //       text: 'Play (open modal)',
  //       icon: 'caret-forward-circle',
  //       handler: () => {
  //         console.log('Play clicked');
  //       }
  //     }, {
  //       text: 'Favorite',
  //       icon: 'heart',
  //       handler: () => {
  //         console.log('Favorite clicked');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }
}
