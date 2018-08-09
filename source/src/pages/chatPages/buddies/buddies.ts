import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';
import { RequestsProvider } from '../../../providers/requests/requests';
import { connreq } from '../../../models/interfaces/request';
import firebase from 'firebase';
/**
 * Generated class for the BuddiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {
  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController,
    public requestservice: RequestsProvider) {
    this.userservice.getallusers().then((allUsers: any) => {
      this.userservice.getUserFriends().then((friends: any) => {
        this.temparr = this.findDifference(allUsers, friends);
        this.temparr = this.temparr.filter(user => user.uid != firebase.auth().currentUser.uid);
        this.filteredusers = this.temparr;
      })
    })
  }

  ionViewDidLoad() {

  }

  findDifference(array1, array2) {
    // Return the difference of array1 to array2
    // Used to obtain array of people the user is not friends with
       return array1.filter(user => !array2.some(other => user.uid === other.uid)
      );
  }

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    this.userservice.getUserRequests(recipient.uid).then((recipReqs: any) => {
      this.userservice.getUserRequests(this.newrequest.sender).then((senderReqs: any) => {
        if (senderReqs.findIndex(req => req.sender == this.newrequest.recipient) != -1) {
          // Check to see if the intended recipient already sent a friend request to the intended sender
          let duplicateAlert = this.alertCtrl.create({
            title: 'Duplicate Request',
            subTitle: recipient.displayName + " has sent you a request that you haven't responded to.",
            buttons: ['OK']
          });
  
          duplicateAlert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
        else if (recipReqs.findIndex(req => req.sender == this.newrequest.sender) != -1) {
          // Check if sender already sent a request to the recipient
          let duplicateAlert = this.alertCtrl.create({
            title: 'Duplicate Request',
            subTitle: 'You have already sent a request to ' + recipient.displayName,
            buttons: ['OK']
          });
  
          duplicateAlert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
        else {
          let successalert = this.alertCtrl.create({
            title: 'Request sent',
            subTitle: 'Your request was sent to ' + recipient.displayName,
            buttons: ['OK']
          });
        
          this.requestservice.sendrequest(this.newrequest).then((res: any) => {
            if (res.success) {
              successalert.present();
              let sentuser = this.filteredusers.indexOf(recipient);
              this.filteredusers.splice(sentuser, 1);
            }
          }).catch((err) => {
            alert(err);
          })
        }
      })
    })
  };

}
