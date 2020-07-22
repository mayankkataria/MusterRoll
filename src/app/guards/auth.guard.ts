import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.loginStatus$()
      .pipe(map(loggedIn => {
        console.log('login status: ', loggedIn);
        if (!loggedIn) {
          return this.router.createUrlTree(['/sign-in']);
        } else {
          console.log('logged in');
          return true;
        }
      }));
  }

  // canLoad(route: Route, segments: import('@angular/router').UrlSegment[]):
  // Observable<boolean> Promise<boolean> | boolean {
  //   console.log('canload');

  //   return this.userService.getURole$()
  //   .pipe(map(role => {
  //     console.log('role: ', role);
  //     console.log('path: ', route.path);
  //     if (role === 'admin') {
  //       if (route.path === 'home') {
  //         return this.router.createUrlTree(['/tabs/admin-home']);
  //       }
  //     } else {
  //       if (route.path === 'home') {
  //         return this.router.createUrlTree(['/tabs/employee-home']);
  //       }
  //     }
  //   }));

    // if (route.path === 'home') {
    //   return new Observable(() => );
      // this.userService.getURole$()
      //   .subscribe(role => {
      //     return role === 'admin' ? this.router.createUrlTree(['/admin-home']) : this.router.createUrlTree(['/employee-home']);
      //   });
    // }
//   }
}
