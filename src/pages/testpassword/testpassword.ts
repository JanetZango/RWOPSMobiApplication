import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Md5 } from 'ts-md5/dist/md5';
/**
 * Generated class for the TestpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testpassword',
  templateUrl: 'testpassword.html',
})
export class TestpasswordPage {
  passwordPlain: string;
  password;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestpasswordPage');
  }


   

    Password(){
      var pass= Md5.hashStr('password')
      console.log(pass)
     
    }
  
}
