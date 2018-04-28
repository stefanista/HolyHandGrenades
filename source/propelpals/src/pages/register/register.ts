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
  @ViewChild('role') role;
  @ViewChild('hobby') hobby;
  @ViewChild('like') like;
  @ViewChild('about') about;
  
  

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
  

  firedata = firebase.database().ref('/chatusers');

  adduser(firstName: string, lastName: string, username: string, user: string, role:string, hobby:string, like:string, about:string): void {
        this.firedata.child(this.fire.auth.currentUser.uid).set({
            uid: this.fire.auth.currentUser.uid,
            firstName, 
            lastName,
            username,
            role,
            photoURL: 'https://openclipart.org/download/247319/abstract-user-flat-3.svg',
            hobby,
            like,
            about
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
            
            // this.createPerson(this.firstname.value, this.lastname.value, this.user.value, this.role.value,this.usernames[0]);
            this.adduser(this.firstname.value,  this.lastname.value, this.user.value, this.usernames[0], this.role.value,this.hobby.value,this.like.value,this.about.value);
            this.alert('Registered!');
        })
        .catch(error =>{
            console.log('got an error', error);
            this.alert(error.message);
        });

    }
  }


  

}
