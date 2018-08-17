import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, Content, Events } from 'ionic-angular';
import { GroupsProvider } from '../../../providers/groups/groups';
import { ImghandlerProvider } from '../../../providers/imghandler/imghandler';
import firebase from 'firebase';

/**
 * Generated class for the GroupchatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groupchat',
  templateUrl: 'groupchat.html',
})
export class GroupchatPage {
  @ViewChild('content') content: Content;
  owner: boolean = false;
  user: any;
  groupName;
  newmessage;
  allgroupmsgs = [];
  alignuid;
  photoURL;
  imgornot;
  constructor(public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupsProvider,
    public actionSheet: ActionSheetController, public zone: NgZone, public events: Events, public imgstore: ImghandlerProvider, public loadingCtrl: LoadingController) {
    this.alignuid = firebase.auth().currentUser.uid;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.user = firebase.auth().currentUser;
    this.groupName = this.navParams.get('groupName');
    this.groupservice.getownership(this.groupName).then((res) => {
      if (res)
        this.owner = true;  
    }).catch((err) => {
      alert(err);
      })
    this.groupservice.getgroupmsgs(this.groupName);
    this.events.subscribe('newgroupmsg', () => {
      this.allgroupmsgs = [];
      this.imgornot = [];
      this.allgroupmsgs = this.groupservice.groupmsgs;
      for (var key in this.allgroupmsgs) {
        if (this.allgroupmsgs[key].message.substring(0, 4) === 'http')
          this.imgornot.push(true);
        else
          this.imgornot.push(false);
      }
    })
    this.scrollto();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatPage');
  }

  ionViewDidEnter() {
    this.groupservice.getgroupmsgs(this.navParams.get('groupName'));
  }

  sendpicmsg() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => {
      loader.dismiss();
      this.groupservice.addgroupmsg(imgurl).then(() => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch((err) => {
      alert(err);
      loader.dismiss();
    })
  }

  presentOwnerSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Add member',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push('GroupbuddiesPage');
          }
        },
        {
          text: 'Remove member',
          icon: 'remove-circle',
          handler: () => {
            this.navCtrl.push('GroupmembersPage');
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', {groupName: this.groupName});
          }
        },
        {
          text: 'Delete Group',
          icon: 'trash',
          handler: () => {
            this.groupservice.deletegroup().then(() => {
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

  presentMemberSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Leave Group',
          icon: 'log-out',
          handler: () => {
            this.groupservice.leavegroup().then(() => {
              this.navCtrl.pop();
            }).catch((err) => {
              console.log(err);
            })
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('GroupinfoPage', {groupName: this.groupName});
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

  addgroupmsg() {
    // If user's message is empty string, just return.
    if (this.newmessage == '') {
      return
    }
    this.groupservice.addgroupmsg(this.newmessage).then(() => {
      this.scrollto();
      this.newmessage = '';
    })
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

}