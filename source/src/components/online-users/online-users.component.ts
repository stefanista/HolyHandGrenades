import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../providers/data.service';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Profile } from '../../models/profile/profile.interface';

@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.component.html'
})

export class OnlineUsersComponent implements OnInit {

  userList: AngularFirestoreCollection<Profile[]>

  constructor(private navCtrl: NavController, private data: DataService) {

  }

  ngOnInit() {
    this.setUserOnline();
    this.getOnlineUsers();
  }

  setUserOnline() {

    //get authenticated user
    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.data.setUserOnline(<Profile> profile);
    })
      //call to a service that sets user online within Firebase

  }

  getOnlineUsers(){
    this.userList = this.data.getOnlineUsers();
  }

  openChat(profile: Profile) {
    this.navCtrl.push('MessagePage', { profile });
  }
}
