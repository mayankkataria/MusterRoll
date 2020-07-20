import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userRole: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    console.log('home page constructor');
  }

  ngOnInit() {
    this.userService.getURole$()
    .subscribe(role => {
      if (role === 'admin') {
        this.router.navigate(['tabs/admin-home']);
      } else {
        this.router.navigate(['tabs/employee-home']);
      }
      // console.log('role: ', role);
      // this.userRole = role;
    });
  }


}
