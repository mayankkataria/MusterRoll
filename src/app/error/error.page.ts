import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  userRole: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getURole$()
      .subscribe(role => this.userRole = role);
  }

}
