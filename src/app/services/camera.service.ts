import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  capturePhoto() {
    return Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });
  }

  accessGallery() {
    return Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 100,
    });
  }

  // accessGallery(){
  //   this.camera.getPicture({
  //      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  //      destinationType: this.camera.DestinationType.DATA_URL
  //     }).then((imageData) => {
  //       this.base64Image = ‘data:image/jpeg;base64,’+imageData;
  //       this.picture = imageData;
  //          }, (err) => {
  //       console.log(err);
  //     });
  //  }
}
