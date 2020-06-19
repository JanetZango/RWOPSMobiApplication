import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LandingpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landingpage',
  templateUrl: 'landingpage.html',
})
export class LandingpagePage {
  currentLoggedIn = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentLoggedIn = this.navParams.get('orgObject')
    console.log(this.currentLoggedIn)

  }

  goToSignIn(){
  this.navCtrl.push(TabsPage, { orgObject: this.currentLoggedIn });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingpagePage');
  }

}
