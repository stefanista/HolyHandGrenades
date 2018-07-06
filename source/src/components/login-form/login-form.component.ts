import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Profile } from '../../models/profile/profile.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent {

  profile = {} as Profile;
  @Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthProvider, private navCtrl: NavController){
    this.loginStatus = new EventEmitter<any>();
  }

  async login() {
    const loginResponse = await this.auth.signInWithEmailAndPassword(this.profile);
    this.loginStatus.emit(loginResponse);
    //const result = await this.auth.signInWithEmailAndPassword(this.account)
    // try {
    //   const result: LoginResponse  = {
    //     result: await this.afAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password)
    //   }
    //   this.loginStatus.emit(result);
    // } catch(e) {
    //   console.error(e);
    //   const error: LoginResponse = {
    //     error: e
    //   }
    //   this.loginStatus.emit(error);
    // }
  }
  navigateToRegisterPage() {
    this.navCtrl.push('RegisterPage');
  }

}
