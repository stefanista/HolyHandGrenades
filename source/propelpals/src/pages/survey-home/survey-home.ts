import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController, ItemSliding } from 'ionic-angular';

import { SurveyJS } from '../../providers/survey/survey';
import { SurveyARPage } from '../survey-ar/survey-ar';
import { SurveyTextPage} from '../survey-text/survey-text';

import { SurveyModel } from "../../models/survey.model";
import firebase from 'firebase';

import { ApiWrapper } from '../../providers/survey/api-wrapper';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';



@Component({
  selector: 'page-survey-home',
  templateUrl: 'survey-home.html'
})
export class SurveyHomePage {

    surveysAPI: SurveyModel[];
    surveysArchivedAPI: SurveyModel[];
    surveys: SurveyModel[] = [];
    archiveSurveys: SurveyModel[];
    userSurveys: Array<any> = [];
    defaultImages: any;
    noSurveys: boolean = false;
    currentYear = new Date().getFullYear();
    firedata = firebase.database().ref('/surveys');

    constructor(public navCtrl: NavController, public surveyJS: SurveyJS,
                public loadingCtrl: LoadingController, public alertCtrl: AlertController, public apiWrapper: ApiWrapper) {
        //this.getActiveSurveys();
        //this.getArchiveSurveys();
        //this.getSurveys();

        // Uncomment below code to test apiWrapper
        // this.apiWrapper.api.surveys.get('getActive', { accessKey: true, ownerId: true }).subscribe(
        //     data => {
        //         console.log(data);
        //     },
        //     error => {
        //         console.log(<any>error);
        //     }
        // );
        
 
    }

    ionViewDidEnter() {
        this.surveys = [];
        this.getSurveys();
    }

  navigateAR(survey) {
        this.navCtrl.push(SurveyARPage, {
          survey: survey
        });
    }

  navigateText(survey) {
        this.navCtrl.push(SurveyTextPage, {
          survey: survey
        });
    }

  getSurveys() {
        let loading = this.loadingCtrl.create({
            content: "Loading Surveys..."
        });
        loading.present();

        Observable.forkJoin(this.surveyJS.getActiveSurveys(), this.surveyJS.getArchiveSurveys())
            .subscribe(data => {
                //console.log(data);
                this.surveysAPI = SurveyModel.fromJSONArray(data[0]);
                this.surveysArchivedAPI = SurveyModel.fromJSONArray(data[1]);
                loading.dismiss();
            },
            error => {
                console.log(<any>error);
                if ((error.message == "Failed to get surveys.") || (error.message == "Http failure response for (unknown url): 0 Unknown Error")) this.noSurveys = true;
                loading.dismiss();
            },
            () => {
                this.checkSurveys()
            });

    }

  getActiveSurveys() {
        let loading = this.loadingCtrl.create({
            content: "Loading Surveys..."
        });

        loading.present();

        this.surveyJS.getActiveSurveys()
            .subscribe(
                data => {
                    //console.log(data);
                    //this.surveys = data;
                    this.surveysAPI = SurveyModel.fromJSONArray(data);
                    loading.dismiss();
                },
                error => {
                    console.log(<any>error);
                    if ((error.message == "Failed to get surveys.") || (error.message == "Http failure response for (unknown url): 0 Unknown Error")) this.noSurveys = true;
                    loading.dismiss();
            }
        );
    }

    checkSurveys() {
        this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
          if(snapshot.val() != null) {
            var temp = snapshot.val();
            for (var key in temp) {
                var completedSurveys = {
                  surveyID: key,
                  completed: temp[key].completed
                }
                this.userSurveys.push(completedSurveys);
            }

            var found = false;

            console.log('searching array');
            // Go through the length of the surveys from the API
            // Go through the length of the completed surveys from user in firebase
            // If survey is found in firebase, do not add to array
            for(var i = 0; i < this.surveysAPI.length; i++) {
                for (var j = 0; j < this.userSurveys.length; j++) {
                    if(this.surveysAPI[i].Id == this.userSurveys[j].surveyID) {
                        found = true;
                    }
                }
                if(found != true) {
                    this.surveys.push(this.surveysAPI[i]);
                }
                found = false;
            }
          }
          else {
              this.surveys = this.surveysAPI;
          }
        })
        
      }

}