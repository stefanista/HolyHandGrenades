import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SurveyARPage } from '../survey-ar/survey-ar';
import { SurveyTextPage} from '../survey-text/survey-text';

/**
 * Generated class for the SurveyHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey-home',
  templateUrl: 'survey-home.html',
})
export class SurveyHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyHomePage');
  }

  navigateAR() {
        this.navCtrl.push(SurveyARPage, {
        });
    }

  navigateText() {
        this.navCtrl.push(SurveyTextPage, {
        });
    }

}