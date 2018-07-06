import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';
import { User } from 'firebase/app';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { DataService } from '../../providers/data.service'

import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { Profile } from '../../models/profile/profile.interface'

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;
  public emailSignUpForm: FormGroup;

  @Output() saveProfileResult: EventEmitter<Boolean>;

  profile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,  public auth: AuthProvider,
    public toastCtrl: ToastController, public viewCtrl: ViewController,
    private data: DataService) {

    // building the form
    this.emailSignUpForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, this.emailDomainValidator])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      firstName: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      dateOfBirth: ['', Validators.compose([Validators.required])]
    });
    
    this.saveProfileResult = new EventEmitter<Boolean>();

  }

  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }

  emailSignUpFormSubmit() {
    // first we check, if the form is valid
    if (!this.emailSignUpForm.valid) {
      this.createToast('Form not valid').present();
      return
    }
    else {
      // if the form is valid, we continue with validation
      this.auth.signUpUser(this.emailSignUpForm.value.email, this.emailSignUpForm.value.password)
        .then(() => {
          this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
            this.authenticatedUser = user;
          });

          this.profile.firstName = this.emailSignUpForm.value.firstName;
          this.profile.lastName = this.emailSignUpForm.value.lastName;
          this.profile.dateOfBirth = this.emailSignUpForm.value.dateOfBirth;

          this.saveProfile();

          // showing succesfull message
          this.createToast('Signed up with email: ' + this.emailSignUpForm.value.email).present();
          // closing dialog
          this.viewCtrl.dismiss();
        },
        /**
         * Handle Authentication errors
         * Here you can customise error messages like our example.
         * https://firebase.google.com/docs/reference/js/firebase.auth.Error
         *
         * mismatch with error interface: https://github.com/angular/angularfire2/issues/976
         */
        (error) => {
          this.createToast(error.message).present();
        })
    }
  }

  async saveProfile() {
    if (this.authenticatedUser) {
      this.profile.email = this.authenticatedUser.email;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  // Validate email to be only UMKC students and faculty
  emailDomainValidator(control: FormControl) { 
    let email = control.value; 
    if (email && email.indexOf("@") != -1) { 
      let [_, domain] = email.split("@"); 
      if (domain === "mail.umkc.edu" || domain === "umkc.edu") { 
        return null;
      }
      else {
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
    }
  }

}
