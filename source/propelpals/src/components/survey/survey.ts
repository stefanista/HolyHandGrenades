import { Component, Input } from '@angular/core';

import * as Survey from 'survey-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';


/**
 * Generated class for the SurveyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'survey',
    templateUrl: 'survey.html'
})
export class SurveyComponent {
    firedata = firebase.database().ref('/surveys');
    _survey: any;

    @Input() set survey(survey) {
        Survey.Survey.cssType = "bootstrap";
        Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

        this._survey = survey;
        let surveyModel = new Survey.ReactSurveyModel({ surveyId: this._survey.Id });

        // Progress Bar.
        surveyModel.showProgressBar = 'bottom';

        surveyModel.onComplete.add(this.sendDataToServerAndFirebase.bind(this));

        Survey.SurveyNG.render('surveyElement', { model: surveyModel });
    }

    constructor(private fire: AngularFireAuth) {
    }

    ionViewDidLoad() {
    }

    sendDataToServerAndFirebase(survey) {
        //console.log("sendDataToServer");
        //console.log("postId", this._survey.PostId);
        survey.sendResult(this._survey.PostId);

        //save data to firebase
        this.firedata.child(this.fire.auth.currentUser.uid).child(this._survey.id).set({
            surveyID: this._survey.id
        })
    };

}
