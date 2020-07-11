import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fence-history',
  templateUrl: './fence-history.page.html',
  styleUrls: ['./fence-history.page.scss'],
})
export class FenceHistoryPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
