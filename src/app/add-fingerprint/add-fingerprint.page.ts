import { Component, OnInit } from '@angular/core';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-fingerprint',
  templateUrl: './add-fingerprint.page.html',
  styleUrls: ['./add-fingerprint.page.scss'],
})
export class AddFingerprintPage implements OnInit {

  foptions: FingerprintOptions;

  constructor(
    private faio: FingerprintAIO,
    private platform: Platform,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    console.log('add fingerprint ngoninit');
    this.foptions = {
      title: 'Add fingerprint',
      subtitle: 'This is subtitle',
      description: 'This is description of fingerprint aio',
      fallbackButtonTitle: 'fallback title',
      cancelButtonTitle: 'Cancel title',
      disableBackup: true
    };
    this.showFingerprint();
  }

  addFingerprint() { }
  async showFingerprint() {
    try {
      await this.platform.ready();
      const available = await this.faio.isAvailable();
      console.log('available: ', available);
      let toast = await this.toastController.create({
        message: 'available: ' + available,
        duration: 3000
      });
      toast.present();
      if (available === 'biometric') {
        const result = await this.faio.show(this.foptions);
          // .then(res => this.successCallback(res.clientId))
          // .catch(err => this.errorCallback(err));
        console.log('result: ', result);
        toast = await this.toastController.create({
          message: 'result: ' + result.token,
          duration: 3000
        });
        toast.present();
    }
    } catch (error) {
      console.log('error: ', error);
    }

    // this.faio.show(this.foptions).then((result) => this.successCallback(result)).catch(err => this.errorCallback(err));
  }

  successCallback(result) {
    alert('Authentication successful: ' + result);
  }

  errorCallback(error) {
    alert('Authentication invalid ' + error.message);
  }

}
