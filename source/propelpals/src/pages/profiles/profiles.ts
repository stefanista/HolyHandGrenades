import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/users/user';



/**
 * Generated class for the ProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {

  temparr = [];
  filteredusers = [];
  name : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider) {
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesPage');
  }

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
 
    this.filteredusers = this.filteredusers.filter((v) => {
    	this.name = v.firstName + v.lastName;
      if (this.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }


}
