import { Component, OnInit, ViewChild } from '@angular/core';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { UserService } from '../services/user.service';
import { ChartDataSets } from 'chart.js';
import { StatService } from '../services/stat.service';
import { Observable } from 'rxjs';
import { MemberService } from '../services/member.service';
import { DateTimeService } from '../services/date-time.service';
import { Platform, ModalController, IonSearchbar } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

  @ViewChild('searchBar', { static: false }) searchBar: IonSearchbar;

  members$: Observable<any[]>;
  filteredDept: string;
  filteredDes: string;
  public showSearchBar = false;

  backObserver = {
    next: data => {
      if (data === 'cancelSearchBar' && this.showSearchBar) {
        console.log('cancel search bar');
        this.cancelSearchBar();
      }
    }
  };

  clockInTime = {
    hr: {
      value: 0,
      text: '00'
    },
    min: {
      value: 0,
      text: '00'
    }
  };

  clockOutTime = {
    hr: {
      value: 0,
      text: '00'
    },
    min: {
      value: 0,
      text: '00'
    }
  };

  constructor(
    private memberService: MemberService,
    public dateTimeService: DateTimeService,
    private platform: Platform,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.members$ = this.memberService.getTodayStatus$();

    // this.platform.backButton.subscribe(this.backObserver);

    this.platform.backButton.subscribe(() => {
      if (this.showSearchBar) {
        this.cancelSearchBar();
      }
    });

    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   this.cancelSearchBar();
    // });

    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   if (this.showSearchBar) {
    //     this.cancelSearchBar();
    //   }
    // });

    //   this.members$.subscribe(todaysData => {
    //     array.forEach(element => {
    //     });
    //     this.clockInTime.text = this.dateTimeService.display('minutes', todaysData.clockInTime.hr)
    //   })
  }

  clickedSearchIcon(event: Event) {
    // this.showSearchBar = !this.showSearchBar;
    this.showSearchBar = true;
    this.focusSearchBar();
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   if (this.showSearchBar) {
    //     this.cancelSearchBar();
    //   }
    // });
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
