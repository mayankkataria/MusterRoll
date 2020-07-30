import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberService } from '../services/member.service';
import { ModalController, IonSearchbar, Platform } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { OthersProfilePage } from '../others-profile/others-profile.page';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  @ViewChild('searchBar', { static: false }) searchBar: IonSearchbar;

  members$: Observable<any>;
  filteredDept: string;
  filteredDes: string;
  userRole: string;
  public showSearchBar = false;


  othersProfilePage = OthersProfilePage;
  contentLoaded = false;

  constructor(
    private memberService: MemberService,
    private modalCtrl: ModalController,
    private userService: UserService,
    private platform: Platform
  ) {

    this.members$ = this.memberService.fetchAllMembers$();
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);

    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   if (this.showSearchBar) {
    //     this.cancelSearchBar();
    //   }
    // });

    this.platform.backButton.subscribe(() => {
      if (this.showSearchBar) {
        this.cancelSearchBar();
      }
    });

    // this.platform.backButton.subscribeWithPriority(5, () => {
    //   console.log('Another handler was called!');
    // });

    // this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    //   console.log('Handler was called!');

    //   processNextHandler();
    // });
  }

  ngOnInit() {
    this.userService.getURole$()
      .subscribe(role => this.userRole = role);
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   if (this.showSearchBar) {
    //     this.cancelSearchBar();
    //   }
    // });
  }

  clickedSearchIcon(event: Event) {
    // this.showSearchBar = !this.showSearchBar;
    this.showSearchBar = true;
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   if (this.showSearchBar) {
    //     this.cancelSearchBar();
    //   }
    // });
    this.focusSearchBar();
  }

  cancelSearchBar() {
    this.showSearchBar = false;
    // this.platform.backButton.unsubscribe();
  }

  focusSearchBar() {
    console.log('focus search');
    // if (this.searchBar) {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 50);
    // }
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
