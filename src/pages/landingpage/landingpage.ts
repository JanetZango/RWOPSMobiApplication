import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { ServiceProvider } from '../../providers/service/service';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from "@ionic/storage";
import { HomePage } from '../home/home';
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
  currentLoggedIn;
  firstname;
  id;
  surname;
  user;
  isLoggedIn: Boolean
  userArr = new Array();
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public verifyLogin: ServiceProvider, public auth: AuthProvider,
     public storage: Storage,public alertCtrl:AlertController) {
    this.currentLoggedIn = this.navParams.get('orgObject')
    // console.log(this.currentLoggedIn)
    // console.log(this.currentLoggedIn[0].id)
    // this.id = this.currentLoggedIn[0].id

    this.getUserProfile();
    // this.storeCurrentUser();

    // console.log(this.id)
  }

  storeCurrentUser() {
    this.auth.login(this.currentLoggedIn).then((data) => {
      // console.log(data)
    })
  }

  ngOnInit(): void {
  }

  
  ionViewDidLoad() {
    // console.log('ionViewDidLoad LandingpagePage');
  }
  getUserProfile() {
    this.storage.get('user').then((user:any) => {
      this.user = user;
      this.userArr = user
      
      // console.log(this.user[0].id)
      this.id = this.user[0].id
      this.isLoggedIn = true;
      this.verifyLogin.getUserProfile(this.id).subscribe((_responseData) => {
        // console.log(_responseData)
        this.firstname = _responseData.firstname
        this.surname = _responseData.surname
      });

    })
  }

  goToSignIn() {
    // console.log(this.userArr)
    this.navCtrl.push(TabsPage, { orgObject: this.userArr });
  }


   // *logout*
   logout() {
    let alert = this.alertCtrl.create({
      cssClass: "myAlert",
      title: 'Logout',
      message: 'You are about to logout, do you want to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.auth.logout().then((data) => {
            //  console.log(data)
             this.navCtrl.push(LoginPage)
            })
          }
        }
      ]
    });
    alert.present();
  }


}
