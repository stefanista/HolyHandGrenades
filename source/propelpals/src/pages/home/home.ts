import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import {ProfilePage} from  '../profile/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public items: Array<any> = [];
  public itemRef: firebase.database.Reference;
  public link: string;
  
  
    constructor( private afDatabase: AngularFireDatabase,private afAuth: AngularFireAuth,
      private toast:ToastController,
      public navCtrl: NavController, public navParams: NavParams) {
  
        this.afAuth.authState.take(1).subscribe(data =>{
          this.itemRef= firebase.database().ref(`/chatusers/${data.uid}`);
        })
  
      }
       
    
  
    ionViewDidLoad() {
      // console.log('ionViewDidLoad HomePage');
      this.itemRef.on('value', itemSnapshot => {
     
        this.items = [];
        itemSnapshot.forEach( itemSnap => {
          this.items.push(itemSnap.val());
          return false;
        });
  
        if (this.items[6]=='Student'){
          this.toast.create({
                  message:`Hello! Student`,
                  duration:6000
                }).present();
          this.link="https://cdn1.iconfinder.com/data/icons/education-1-15/151/26-512.png"
        }
        else  if (this.items[6]=='Teacher'){
          this.toast.create({
            message:`Hello! Teacher`,
            duration:6000
          }).present();
          this.link="https://cdn4.iconfinder.com/data/icons/fun-colorful-academic/700/Instructor_Icon_-_Illustration-512.png"
        }
        else {
          this.toast.create({
            message:`Hello! Mentor`,
            duration:6000
          }).present();
          this.link="https://www.naturalwellnessacademy.org/wp-content/uploads/2017/07/mentor-teacher-instructor-icon.png"
        }
      })
      
    
  
    }
    edit(){
      this.navCtrl.setRoot( ProfilePage );
    
    }
  
  }
  