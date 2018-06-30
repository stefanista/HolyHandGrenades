import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login-response.interface';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) { }

  signInUser(newEmail: string, newPassword: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  signUpUser(newEmail: string, newPassword: string): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  googleSignUp(): Promise<void> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  getAuthenticatedUser(){
    return this.afAuth.authState;
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    } catch(e) {
      return <LoginResponse> {
        error: e
      };
    }
  }

}
