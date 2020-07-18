import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { secConfig } from '../secondary-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  config: any;
  secondaryApp: any;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    console.log('auth service constructor');
    this.loginStatus$()
      .subscribe(loggedIn => {
        loggedIn ? console.log('user logged in') : console.log('user logged out');
      });
    this.secondaryApp = firebase.initializeApp(secConfig, 'Secondary');
  }

  loginStatus$() {
    console.log('login status $');
    return this.afAuth.authState
      .pipe(map(user => !!user));
  }

  async createAdminAccount(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async createEmpAccount(email: string, password: string) {
    return await this.secondaryApp.auth().createUserWithEmailAndPassword(email, password);
  }

  signOutEmp() {
    return this.secondaryApp.auth().signOut();
  }

  async deleteAccount(email: string, password: string) {
    return await this.signIn(email, password)
      .then(userInfo => userInfo.user.delete());
  }

  async signIn(email: string, password: string) {
    console.log('sign in');
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() {
    return await this.afAuth.signOut();
  }

}
