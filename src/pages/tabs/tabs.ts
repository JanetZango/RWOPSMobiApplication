import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavController, Slides, AlertController, NavParams } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  currentLoggedIn;
  tab1Params;

  constructor(public navParams: NavParams,public navCtrl: NavController,) {
    this.currentLoggedIn = this.navParams.get('orgObject')
    console.log(this.currentLoggedIn)
  
    this.tab1Params = {orgObject: this.currentLoggedIn  };
    console.log(this.tab1Params)
  }

  get(){
  this.navCtrl.push(TabsPage, { orgObject: this.currentLoggedIn });
  }
  

}

export class currentLoggedIn{
  id:string
}
