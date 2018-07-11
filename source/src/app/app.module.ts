import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// AngularFire + Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';

// Profile Pages
import { EditProfilePage } from '../pages/edit-profile-page/edit-profile-page';

// Survey Pages
import { SurveysPage } from '../pages/surveys/surveys';

// Chat Pages
import { ChatPage } from '../pages/chat/chat';
import { ChannelsPage } from '../pages/channels-page/channels-page';

// User Auth Pages
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

// Modules
// import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TextareaAutoresizeDirective } from '../directives/textarea-autoresize/textarea-autoresize';
import { DataService } from '../providers/data.service';
import { ChatService } from '../providers/chat.service';

export const firebaseConfig = {
  apiKey: "AIzaSyBIhFWiwis9PnVuwmBcQ42t1uV7fDQs0P4",
  authDomain: "umkc-propel-program.firebaseapp.com",
  databaseURL: "https://umkc-propel-program.firebaseio.com",
  projectId: "umkc-propel-program",
  storageBucket: "umkc-propel-program.appspot.com",
  messagingSenderId: "210198393063"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    EditProfilePage,
    SurveysPage,
    ContactPage,
    ChatPage,
    ChannelsPage,
    TabsPage,
    TextareaAutoresizeDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    EditProfilePage,
    SurveysPage,
    ContactPage,
    ChatPage,
    ChannelsPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestoreModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DataService,
    ChatService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
