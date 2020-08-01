import { Component, OnInit } from '@angular/core';
import { FingerprintOptions, FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Platform, ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.page.html',
  styleUrls: ['./clock-in.page.scss'],
})
export class ClockInPage implements OnInit {

  foptions: FingerprintOptions;
  toast: any;

  constructor(
    private faio: FingerprintAIO,
    private platform: Platform,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log('add fingerprint ngoninit');
    this.foptions = {
      title: 'Verify fingerprint',
      fallbackButtonTitle: 'fallback title',
      cancelButtonTitle: 'Cancel title',
      disableBackup: true
    };
    this.showFingerprint();
  }

  async showFingerprint() {
    try {
      await this.platform.ready();
      const available = await this.faio.isAvailable();
      console.log('available: ', available);
      this.toast = await this.toastController.create({
        message: 'available: ' + available,
        duration: 3000
      });
      await this.toast.present();
      if (this.platform.is('android') && available === 'biometric') {
        const result = await this.faio.show(this.foptions);
        console.log('result: ', result);
        if (result === 'biometric_success') {
          this.toast = await this.toastController.create({
            message: 'Authentication Successful',
            duration: 3000
          });
          await this.toast.present();
        }
        this.closeModal(result);
    }
    } catch (error) {
      this.toast = await this.toastController.create({
        message: error.message,
        duration: 3000
      });
      await this.toast.present();
      console.log('error: ', error);
      this.closeModal(error.message);
    }
  }

  successCallback(result) {
    alert('Authentication successful: ' + result);
  }

  errorCallback(error) {
    alert('Authentication invalid ' + error.message);
  }

  closeModal(result: string) {
    this.modalController.dismiss({
      biometricResult: result
    });
  }
}
