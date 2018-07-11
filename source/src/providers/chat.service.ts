import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
 import "rxjs/add/operator/mergeMap";
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';

import { Channel } from '../models/channel/channel.interface';
import { ChannelMessage } from '../models/channel/channel-message.interface';
import { Message } from '../models/messages/message.interface';
import { AuthProvider } from './auth/auth';

@Injectable()

export class ChatService {
  constructor(private auth: AuthProvider, private afs: AngularFirestore) {

  }
  addChannel(channelName: string) {
    this.afs.collection(`channel-names`).add({ name: channelName });
  }

  getChannelListRef(): AngularFirestoreCollection<Channel> {
    return this.afs.collection(`channel-names`);
  }

  getChannelChatRef(channelKey: string) {
    return this.afs.collection(`channels/${channelKey}`);
  }

  async sendChannelChatMessage(channelKey: string, message: ChannelMessage){
     await this.afs.collection(`/channels/${channelKey}`).add(message);
  }

  async sendChat(message: Message) {
    await this.afs.collection(`/messages`).add(message);
  }

  getChats(userTwoId: string) {
    return this.auth.getAuthenticatedUser()
      .map(auth => auth.uid)
      .mergeMap(uid => this.afs.collection(`/user-messages/${uid}/${userTwoId}`).valueChanges())
      .mergeMap(chats => {
        return Observable.forkJoin(
          chats.map(chat => this.afs.collection(`/messages/${chat}`).valueChanges().first()),
          (...vals: Message[]) => {
            console.log(vals);
            return vals;
          }
        )
      })
  }

  getLastMessagesForUser() {
    return this.auth.getAuthenticatedUser()
      .map(auth => auth.uid)
      .mergeMap(authId => this.afs.collection(`/last-messages/${authId}`).valueChanges())
      .mergeMap(messageIds => {
        return Observable.forkJoin(
          messageIds.map(message => {
            return this.afs.collection(`/messages/${message}`).valueChanges()
              .first()
          }),
          (...values) => {
            console.log(values);
            return values;
          }
        )
      })
  }
}
