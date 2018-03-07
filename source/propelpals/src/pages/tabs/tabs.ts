import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoggedinPage } from '../loggedin/loggedin';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoggedinPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
