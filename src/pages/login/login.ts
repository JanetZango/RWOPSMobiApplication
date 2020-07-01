import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
// import { NgModel, NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../model/user.model';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { LandingpagePage } from '../landingpage/landingpage';
import {AuthProvider} from '../../providers/auth/auth'
export interface AuthResponseData {
  email: string
  username: string
  password_hash: number
  id: number;
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //variables
  private User: User;
  private userForm: FormGroup;
  logo: boolean = true
  lowdesign: boolean = true
  email
  password_hash;
  LoggInUser;


  // arrays
  displayUser = new Array();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public verifyLogin: ServiceProvider,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public auth:AuthProvider
  ) {
    this._buildForm();
  }

  ionViewDidLoad() {
    this.verifyLogin.getUser().subscribe(_responseData => {
    });
  }

  onInput($event) {
    this.logo = false
    this.lowdesign = false
  }
  noInput($event) {
    this.logo = true;
    this.lowdesign = true
  }
  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }
  signup() {
    this.navCtrl.push(RegisterPage)
  }


  // **validate the form inputs
  _buildForm() {
    this.userForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators]],

    })
  }


  // login method
  getEmail() {
    this.verifyLogin.getUser().subscribe(_responseData => {
      this.auth.login(_responseData).then((data=>{
        // console.log(data)
      })) 
      for (var x = 0; x < _responseData.length; x++) {
        let obj = {
          email: _responseData[x].email,
          password_hash: _responseData[x].password_hash,
          username: _responseData[x].username,
          id: _responseData[x].id
        }
        // console.log(obj)
        this.LoggInUser = obj
        // console.log(this.LoggInUser.email)      
        if (this.LoggInUser.email === this.userForm.value.email && this.LoggInUser.password_hash === this.userForm.value.password) {       
          let obj = {
            id: _responseData[x].id,
            email: _responseData[x].email,
            username: _responseData[x].username,
            password_hash: _responseData[x].password_hash
          }
          // console.log(obj)
          this.displayUser.push(obj)
          // console.log(this.displayUser)    
          this.navCtrl.setRoot(LandingpagePage, { orgObject: this.displayUser });
          this.auth.login(this.displayUser).then((data) => {
            // console.log(data)
          })
        }
        else {
          // console.log('error')
        }
      }
    
    }, _error => {
      const alert = this.alertCtrl.create({
        title: 'Oops',
        subTitle: 'Something went wrong, please contact administrator.',
        buttons: ['OK']
      });
      alert.present();
    });
  }
  _isInvalidControl(name: string) {
    return this.userForm.get(name).invalid && this.userForm.get(name).dirty;
  }
}
