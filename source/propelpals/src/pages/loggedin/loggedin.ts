import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {

    email: string;
    password: string;
    public items: Array<any> = [];
    public myPerson: object = {};

  constructor( private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  
    this.email = fire.auth.currentUser.email;
    this.items = this.email.split('@');
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
    
    const personRef: firebase.database.Reference = firebase.database().ref('/'+ this.items[0] +'/');
    
    personRef.on('value', personSnapshot => {
        this.myPerson = personSnapshot.val();
        return false;
    });
  }

}
