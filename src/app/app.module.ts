import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TestpasswordPage } from '../pages/testpassword/testpassword';
import { ServiceProvider } from '../providers/service/service';
import { ConfigService } from "../providers/service/ConfigService";
import { GenerateDocumentPage } from '../pages/generate-document/generate-document';
import { LandingpagePage } from '../pages/landingpage/landingpage';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    TestpasswordPage,
    GenerateDocumentPage,
    LandingpagePage
  ],
  imports: [
    BrowserModule,
     HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    TestpasswordPage,
    GenerateDocumentPage,
    LandingpagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    ConfigService,
    File,
    FileOpener,
   
  ]
})
export class AppModule {}