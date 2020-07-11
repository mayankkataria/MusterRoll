import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FenceHistoryPage } from '../fence-history/fence-history.page';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.page.html',
  styleUrls: ['./employee-home.page.scss'],
})
export class EmployeeHomePage implements OnInit {

  inFence = false;

  constructor(
    private modalCrl: ModalController
  ) { }

  ngOnInit() {
  }

  refreshLocation() {
    this.inFence = !this.inFence;
  }

  async openFenceHistory() {
    const fenceHistoryModal = await this.modalCrl.create({
      component: FenceHistoryPage
    });
    fenceHistoryModal.present();
  }

}
