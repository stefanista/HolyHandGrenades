import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { User } from 'firebase/app';
import { database } from 'firebase';
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";


import { Profile } from '../models/profile/profile.interface';
import { AuthProvider } from './auth/auth';

@Injectable()
export class DataService {

  profileObject: AngularFireObject<Profile>
  profileList: AngularFireList<Profile>

  constructor(private authService: AuthProvider, private database: AngularFireDatabase) {
  }

  searchUser(firstName: string) {
    return this.database.list('/profiles', ref => {
      let q = ref.limitToLast(25).orderByChild('firstname').equalTo(firstName);
      return q;
    })
  }

  getAuthenticatedUserProfile() {
    return this.authService.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(authId => this.database.object(`profiles/${authId}`).valueChanges())
      .take(1)
  }

  getProfile(user: User){
    this.profileObject = this.database.object(`/profiles/${user.uid}`);

    return this.profileObject.valueChanges();
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
    try {
      await this.profileObject.set(profile);
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

  getOnlineUsers(): AngularFireList<Profile[]> {
    return this.database.list(`online-users`);
  }

}
