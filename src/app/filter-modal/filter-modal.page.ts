import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {

  @Input()
  departmentList: string[]; designationList: string[]; department: string; designation: string;

  // departmentList: string[] = ['All', 'IT', 'HR', 'RESOURCE'];
  // designationList: string[] = ['All', 'QA', 'Manager', 'Accountant', 'Receptionist'];
  // department = 'all';
  // designation = 'all';

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('departmentList: ', this.departmentList);
  }

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
