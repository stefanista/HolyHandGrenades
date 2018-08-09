import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage {

  existingProfile = {} as Profile;

  constructor(private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

//don't have to retrieve profile from firebase again
  getExistingProfile(profile: Profile) {
    this.existingProfile = profile;
  }

  signOut() {
    this.auth.signOutUser();
    this.navCtrl.setRoot('LoginPage');
  }

  navigateToEditProfilePage() {
    this.navCtrl.push('EditProfilePage', { existingProfile: this.existingProfile});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
