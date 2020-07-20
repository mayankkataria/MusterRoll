import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userService.getURole$()
      .pipe(map(role => {
        if (role === 'employee') {
          console.log('is employee');
          return true;
        } else {
          console.log('not emp');
          return false;
        }
        // return role === 'employee' ? console.log('role emp') : console.log('role not emp');
      }));
  }
}
