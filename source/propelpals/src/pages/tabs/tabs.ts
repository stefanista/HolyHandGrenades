import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SurveyHomePage } from '../survey-home/survey-home';
import { ChatPage } from '../chat/chat';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SurveyHomePage;
  tab3Root = ChatPage;
  tab4Root = ContactPage;


  constructor() {

  }
}
