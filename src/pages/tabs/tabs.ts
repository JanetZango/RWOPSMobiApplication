import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavController, Slides, AlertController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { LoginPage } from '../login/login';
import { LandingpagePage } from '../landingpage/landingpage';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:any = HomePage;
  tab2Root:any = AboutPage;
  tab3Root:any = ContactPage;
  tab4Root:any = LandingpagePage

  currentLoggedIn;
  tab1Params;
  seltabix: number;
  constructor(public navParams: NavParams,public navCtrl: NavController,
    public alertCtrl:AlertController,
    public storage: Storage,np: NavParams) {
    this.currentLoggedIn = this.navParams.get('orgObject')
    // console.log(this.currentLoggedIn)
  
    this.tab1Params = {orgObject: this.currentLoggedIn  };
    // console.log(this.tab1Params)
    this.seltabix = np.get('orgObject');
    
  }

  get(){
  this.navCtrl.push(TabsPage, { orgObject: this.currentLoggedIn });
  }
  BackToHome(){
    this.navCtrl.push(LandingpagePage)
  }


}

