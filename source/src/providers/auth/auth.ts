import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { LoginResponse } from '../../models/login/login-response.interface';
import 'rxjs/add/operator/do'


@Injectable()
export class AuthProvider {
  firedata = firebase.database().ref('/users');
  userId: string; // current user uid

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    /// Subscribe to auth state in firebase
    this.afAuth.authState
    .do(user => {
      if (user) {
         this.userId = user.uid
         this.updateOnConnect()
         this.updateOnDisconnect()
      }

    })
    .subscribe();
  }

  userEmailVerified() {
    return this.afAuth.auth.currentUser.emailVerified;
  }

  sendEmailVerification() {
    this.afAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
      });
  }

  signInUser(newEmail: string, newPassword: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  signUpUser(newEmail: string, newPassword: string): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then((res) => {
      this.sendEmailVerification()
    })
    .catch((err)=> {
      console.log('Unable to signup user.')
    });;
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

  getAuthenticatedUser() {
    return this.afAuth.authState;
  }

  async createUserWithEmailAndPassword(profile: Profile) {
    try {
      return <LoginResponse> {
        result: await this.afAuth.auth.createUserWithEmailAndPassword(profile.email, profile.password)
      }

    } catch(e) {
      return <LoginResponse> {
        error: e
      }
    }
  }

  async createUserProfile(profile: Profile) {
    try {
      return this.afAuth.auth.currentUser.updateProfile({
        displayName: profile.firstName + ' ' + profile.lastName,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/umkc-propel-program.appspot.com/o/DefaulProfilePic.png?alt=media&token=21d5bf61-5d6d-43fc-b403-613277345d44'
      }).then(() => {
        this.firedata.child(this.afAuth.auth.currentUser.uid).set({
          uid: this.afAuth.auth.currentUser.uid,
          displayName: profile.firstName + ' ' + profile.lastName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/umkc-propel-program.appspot.com/o/DefaulProfilePic.png?alt=media&token=21d5bf61-5d6d-43fc-b403-613277345d44'
        })
      })
    } catch(e) {
      return e;
    }
  }

  async signInWithEmailAndPassword(profile: Profile) {
    try {
      return <LoginResponse> {
        result: await this.afAuth.auth.signInWithEmailAndPassword(profile.email, profile.password)
      };
    } catch(e) {
      return <LoginResponse> {
        error: e
      };
    }
  }

  /// Helper to perform the update in Firebase
  private updateStatus(status: string) {
    if (!this.userId) return

    this.db.object(`users/` + this.userId).update({ status: status })
  }

  /// Updates status when connection to Firebase starts
  private updateOnConnect() {
    return this.db.object('.info/connected')
                  .do(connected => {
                      let status = connected.$value ? 'online' : 'offline'
                      this.updateStatus(status)
                  })
                  .subscribe()
  }

  /// Updates status when connection to Firebase ends
  private updateOnDisconnect() {
    firebase.database().ref().child(`users/${this.userId}`)
            .onDisconnect()
            .update({status: 'offline'})
  }

}
