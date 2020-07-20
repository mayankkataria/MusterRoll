import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from '../services/member.service';
import { ModalController } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  members: Observable<any>;
  filteredDept: string;
  filteredDes: string;
  userRole: string;

  constructor(
    private memberService: MemberService,
    private modalCtrl: ModalController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.members = this.memberService.fetchAllMembers$();
    this.userService.getURole$()
      .subscribe(role => this.userRole = role);
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
