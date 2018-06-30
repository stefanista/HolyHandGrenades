import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { Message } from '../../models/messages/message.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { DataService } from '../../providers/data.service';
import { ChatService } from '../../providers/chat.service';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  selectedProfile: Profile
  messageList: Observable<Message[]>

  userId: string;
  userProfile: Profile;
  tempProfile: Profile;

  constructor(private chat: ChatService, public auth: AuthProvider, private data: DataService, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get('profile');
    this.data.getAuthenticatedUserProfile()
      .subscribe(profile => {
      this.tempProfile = <Profile> profile;
      this.userProfile = <Profile> profile
      this.userId = this.tempProfile.$key;
    });

    this.messageList = this.chat.getChats(this.selectedProfile.$key);
  }

  async sendMessage(content: string) {
    try {
      const message: Message = {
        userToId: this.selectedProfile.$key,
        userToProfile: {
          firstName: this.selectedProfile.firstName,
          lastName: this.selectedProfile.lastName
        },
        userFromProfile: {
          firstName: this.userProfile.firstName,
          lastName: this.userProfile.lastName
        },
        userFromId: this.userId,
        content: content
      }

      await this.chat.sendChat(message);

    } catch (e) {
      console.error(e);
    }
  }
}
