import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

// AngularFire + Firebase + Firestore
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';

// Profile Pages
import { ProfilePage } from '../pages/profile-page/profile-page'

// Survey Pages
import { SurveysPage } from '../pages/surveys/surveys';

// Channel Pages
import { ChannelsPage } from '../pages/channels-page/channels-page';

// Chat Pages
import { ChatsPage } from '../pages/chatPages/chats/chats';
import { GroupsPage } from '../pages/chatPages/groups/groups';

// Chat Providers
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';
import { GroupsProvider } from '../providers/groups/groups';
import { UserProvider } from '../providers/user/user';

// User Auth Pages
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

// Modules
import { TabsPageModule } from './../pages/tabs/tabs.module';
import { EditProfilePageModule } from './../pages/edit-profile-page/edit-profile-page.module';

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
    ProfilePage,
    SurveysPage,
    ChatsPage,
    GroupsPage,
    ContactPage,
    ChannelsPage,
    TextareaAutoresizeDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    EditProfilePageModule,
    TabsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    SurveysPage,
    ChatsPage,
    GroupsPage,
    ContactPage,
    ChannelsPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FilePath,
    FileChooser,
    AngularFirestoreModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DataService,
    ChatService,
    ImghandlerProvider,
    UserProvider,
    RequestsProvider,
    ChatProvider,
    GroupsProvider
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
