import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  currentLoggedIn = new Array();
  firstname;
  surname;
  id_number;
  id;
  email;
  username;
  status;
  description;
  create_user_id;
  getStatus= new Array();
  constructor(public navCtrl: NavController,
     public navParams: NavParams,  public service: ServiceProvider,) {

    this.currentLoggedIn.push(this.navParams.get('orgObject'));
   
    
    // console.log(this.currentLoggedIn[0][0].username)
    this.id = this.currentLoggedIn[0][0].id
    // this.username = this.currentLoggedIn[0][0].username
    // this.surname = this.currentLoggedIn[0][0].surname
    this.id_number = this.currentLoggedIn[0][0].id_number
    this.email = this.currentLoggedIn[0][0].email
    console.log(this.id)
   
  
  }

  ionViewDidLoad() {
    
    this.getApplication();
    this.getUserProfile()
  }

  getUserProfile() {
    this.service.getUserProfile(this.id).subscribe((_responseData) => {
      this.firstname = _responseData.firstname
      this.surname = _responseData.surname
    })
  }
  getApplication(){
    this.service.getApplication().subscribe(_response => {
      console.log(_response)
      this.firstname =_response.first_name
      this.surname =_response.surname
      this.status=_response.status_id
      this.create_user_id=_response.create_user_id
      console.log(this.create_user_id)

      this.getStatus = _response.status_id
      console.log(this.getStatus)
      this.getApplicationStatusMethod()
    })
  
  }

  getApplicationStatusMethod() {
    console.log(this.getStatus)
    this.service.getApplicationStatus(this.status).subscribe(_responseDataStatus => {
    this.description =_responseDataStatus.description
    console.log(this.description)
    })
  }

}
