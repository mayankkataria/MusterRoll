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
      quality: 100
    });
  }
}
