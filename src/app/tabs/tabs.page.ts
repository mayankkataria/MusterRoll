import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Platform, MenuController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { ProfilePage } from '../profile/profile.page';
import { MembersPage} from  '../members/members.page';
import { StatisticsPage } from '../statistics/statistics.page';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  userRole: string;
  home=HomePage;
  members=MembersPage;
  profile=ProfilePage;
  statistics=StatisticsPage;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getURole$()
      .subscribe(role => {
        this.userRole = role;
      });
  }


}



