import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Platform, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  userRole: string;

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



