import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { EventsPage } from './../events/events'
import {Facebook} from "ng2-cordova-oauth/core";
import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var window: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private items: any =[];


  constructor(public navCtrl: NavController,private platform: Platform) {}

  public login() {
    this.platform.ready().then(() => {
      this.facebookLogin().then(success => {
        // alert(success.access_token);
        this.navCtrl.push(EventsPage)
      }, (error) => {
        this.navCtrl.push(EventsPage)
      });
    });
  }

  public facebookLogin(): Promise<any> {
    return new Promise(function(resolve, reject) {
      var browserRef = window.cordova.InAppBrowser.open("https://www.facebook.com/v2.0/dialog/oauth?client_id=" + "351111688575119" + "&redirect_uri=http://localhost/callback&response_type=token&scope=email", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
      browserRef.addEventListener("loadstart", (event) => {
        if ((event.url).indexOf("http://localhost/callback") === 0) {
          browserRef.removeEventListener("exit", (event) => {});
          browserRef.close();
          var responseParameters = ((event.url).split("#")[1]).split("&");
          var parsedResponse = {};
          for (var i = 0; i < responseParameters.length; i++) {
            parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
          }
          if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
            resolve(parsedResponse);
          } else {
            reject("Problem authenticating with Facebook");
            console.log('flow cancelled');
          }
        }
      });
      browserRef.addEventListener("exit", function(event) {
        reject("The Facebook sign in flow was canceled");
        console.log('flow cancelled');
      });
    });

  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

}





