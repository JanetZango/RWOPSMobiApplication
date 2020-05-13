import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage{
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
    public navParams: NavParams,  public service: ServiceProvider) {
    this.currentLoggedIn.push(this.navParams.get('orgObject'));
    this.id = this.currentLoggedIn[0][0].id
    this.id_number = this.currentLoggedIn[0][0].id_number
    this.email = this.currentLoggedIn[0][0].email 
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
      for(var x =0; x < _response.length ;x++){
        if(this.id == _response[x].create_user_id){
         let obj = {
          create_user_id: _response[x].create_user_id,
          firstname: _response[x].first_name,
          surname : _response[x].surname,
          status: _response[x].status_id
          }    
          this.getStatus = obj.status    
        }
      }
     
      this.getApplicationStatusMethod()
    })
  }
  getApplicationStatusMethod() {
    this.service.getApplicationStatus(this.getStatus).subscribe(_responseDataStatus => {
    this.description =_responseDataStatus.description
    })
  }

}
