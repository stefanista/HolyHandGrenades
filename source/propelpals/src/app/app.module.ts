import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { SurveyHomePage } from '../pages/survey-home/survey-home';
import { ChatPage} from '../pages/chat/chat';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


const firebaseAuth = {
    apiKey: "AIzaSyBjyQenurH7RFfj9iOC34USGn6BWgdG6AI",
    authDomain: "login-project-36e3f.firebaseapp.com",
    databaseURL: "https://login-project-36e3f.firebaseio.com",
    projectId: "login-project-36e3f",
    storageBucket: "login-project-36e3f.appspot.com",
    messagingSenderId: "596843832188"
  };


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    RegisterPage,
    HomePage,
    AboutPage,
    ContactPage,
    TabsPage,
    SurveyHomePage,
    ChatPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    RegisterPage,
    HomePage,
    AboutPage,
    ContactPage,
    TabsPage,
    SurveyHomePage,
    ChatPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
