import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from 'firebase/app';
import { database } from 'firebase';
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";


import { Profile } from '../models/profile/profile.interface';
import { AuthProvider } from './auth/auth';

@Injectable()
export class DataService {

  profileCollection: AngularFirestoreCollection<Profile>;
  profileObs$: Observable<Profile[]>;

  constructor(private authService: AuthProvider, private afs: AngularFirestore) {
  }

  searchUser(firstName: string) {
    return this.afs.collection('/profiles', ref => {
      let q = ref.where('firstName', '==', firstName);
      return q;
    })
  }

  getAuthenticatedUserProfile() {
    return this.authService.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(authId => this.afs.doc(`profiles/${authId}`).valueChanges())
      .take(1)
  }

  getProfile(user: User){
    const profileDoc: AngularFirestoreDocument<any> = this.afs.doc(`/profiles/${user.uid}`);

    return profileDoc.valueChanges();
  }

  async saveProfile(user: User, profile: Profile) {
    const profileDoc: AngularFirestoreDocument<any> = this.afs.collection('/profiles').doc(`${user.uid}`);
    const profileObs$: Observable<any> = this.afs.collection('/profiles').doc(`${user.uid}`).valueChanges();

    try {
      profileDoc.set(profile, {merge: true});
      await profileObs$;
      console.log("Successful");
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }

  setUserOnline(profile: Profile) {
    const ref = database().ref(`online-users/${profile.$key}`);

    try {
      ref.update({ ...profile });
      ref.onDisconnect().remove();
    }
    catch(e){
      console.error(e);
    }
  }

  getOnlineUsers(): AngularFirestoreCollection<Profile[]> {
    return this.afs.collection(`online-users`);
  }

}
