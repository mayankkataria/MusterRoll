import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from '../services/member.service';
import { ModalController } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  members: Observable<any>;
  filteredDept: string;
  filteredDes: string;

  constructor(
    private memberService: MemberService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.members = this.memberService.fetchAllMembers$();
  }

  async openFilterModal() {
    const filterModal = await this.modalCtrl.create({
      component: FilterModalPage
    });
    await filterModal.present();
    filterModal.onDidDismiss()
      .then(filterData => {
        if (filterData.data) {
          this.filteredDept = filterData.data.filteredDept;
          this.filteredDes = filterData.data.filteredDes;
        }
      })
      .catch(err => console.log('onDidDismiss error: ', err));
  }

}
