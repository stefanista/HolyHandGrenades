import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Message } from '../../models/messages/message.interface';

@IonicPage()
@Component({
  selector: 'page-chat-page',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messageList : Message[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.messageList);
  }
  navigateToSearchUserPage() {
    this.navCtrl.push('SearchUserPage');
  }
}
