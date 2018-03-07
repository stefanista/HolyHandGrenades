import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') user;
  @ViewChild('password') password;
  @ViewChild('firstname') firstname;
  @ViewChild('lastname') lastname;
  @ViewChild('passwordC') passwordC;
  
  

  constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
  alert(message: string) {
  
    this.alertCtrl.create({
        title: 'Info!',
        subTitle: message,
        buttons: ['OK'] 
    }).present();
  }
  
  public usernames: Array<any> = [];
  
  createPerson(firstName: string, lastName: string, username: string, password: string): void {
  const personRef: firebase.database.Reference = firebase.database().ref('/' + password + '/');
      personRef.set({ 
        firstName, 
        lastName,
        username
      })
  }
  
  registerUser() {
  
    if (this.password.value != this.passwordC.value) {
        this.alert('Passwords do not Match');
    }
    else {
        this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value).then(data =>{
            console.log('got data ', data);
            
            this.usernames = this.user.value.split('@');
            
            this.createPerson(this.firstname.value, this.lastname.value, this.user.value, this.usernames[0]);
            this.alert('Registered!');
        })
        .catch(error =>{
            console.log('got an error', error);
            this.alert(error.message);
        });


        console.log('Would register user with ', this.user.value, this.password.value);
    }
  }

}
