import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { timer } from 'rxjs/observable/timer';
import { LandingpagePage } from '../pages/landingpage/landingpage';
import { AuthProvider } from '../providers/auth/auth'
import { Storage } from "@ionic/storage";
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  showSplash = true;
  isLoggedIn: Boolean;
  user: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public auth: AuthProvider, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.auth.getUser().then((user:any) => {
        console.log(user)
        if (user != null) {
          this.rootPage = LandingpagePage
        }
        else{
          this.rootPage = LoginPage
        }



      })
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
    });
  }
}
