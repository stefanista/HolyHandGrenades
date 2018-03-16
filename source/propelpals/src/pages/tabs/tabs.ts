import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoggedinPage } from '../loggedin/loggedin';
import { SurveyHomePage } from '../survey-home/survey-home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoggedinPage;
  tab2Root = SurveyHomePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
