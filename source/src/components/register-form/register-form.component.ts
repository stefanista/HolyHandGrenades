import { Component, Output, EventEmitter } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';

import { Account } from  '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  account = {} as Account;
  @Output() registerStatus: EventEmitter<LoginResponse>

  constructor(private auth: AuthProvider) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }
  async register() {
    try {
      const result = await this.auth.createUserWithEmailAndPassword(this.account);
      this.registerStatus.emit(result);

    } catch(e) {
      console.error(e);
      this.registerStatus.emit(e);
    }
  }
}
