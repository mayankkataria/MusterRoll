import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {

  departmentList: string[] = ['All', 'IT', 'HR', 'RESOURCE'];
  designationList: string[] = ['All', 'QA', 'Manager', 'Accountant', 'Receptionist'];
  department = 'All';
  designation = 'All';

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  filter() {
    this.modalCtrl.dismiss({
      filteredDept: this.department,
      filteredDes: this.designation
    });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

}
