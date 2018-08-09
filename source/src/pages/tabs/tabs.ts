import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChatsPage } from '../chatPages/chats/chats';
import { GroupsPage } from '../chatPages/groups/groups';
import { ChannelsPage } from '../channels-page/channels-page';
import { SurveysPage } from '../surveys/surveys';
import { ContactPage } from '../contact/contact';
import { ProfilePage } from '../profile-page/profile-page'

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage
  chatRoot = ChatsPage
  groupRoot = GroupsPage
  channelsRoot = ChannelsPage
  surveysRoot = SurveysPage
  contactRoot = ContactPage
  profileRoot = ProfilePage


  constructor(public navCtrl: NavController) {}

}
