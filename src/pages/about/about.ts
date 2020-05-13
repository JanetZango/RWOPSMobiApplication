import { Component ,ViewChild} from '@angular/core';
import { NavController,Slides,NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('mySlider')  slides: Slides;
  currentLoggedIn = new Array();
  firstname;
  surname;
  id_number;
  id;
  email;
  username;
  persal_number;
  department_id;
  departmentDescription;
  job_functions;
  
  status;
  description;
  create_user_id;
  getStatus= new Array();
  displayStatus = new Array();
  constructor(public navCtrl: NavController,public navParams: NavParams, 
    public service: ServiceProvider) {
    this.currentLoggedIn.push(this.navParams.get('orgObject'));
    this.id = this.currentLoggedIn[0][0].id
    this.username = this.currentLoggedIn[0][0].username
    this.surname = this.currentLoggedIn[0][0].surname
    this.id_number = this.currentLoggedIn[0][0].id_number
    this.email = this.currentLoggedIn[0][0].email

    this.getUserProfile();
    this.getApplication2()
  }
  getUserProfile() {
    this.service.getUserProfile(this.id).subscribe((_responseData) => {
      this.firstname = _responseData.firstname
      this.surname = _responseData.surname
      this.persal_number = _responseData.persal_number
      this.department_id = _responseData.department_id
      this.job_functions = _responseData.job_functions
  this.getDepartment();
    })
    }
    getApplication2(){
      this.service.getApplication().subscribe(_response => {
        for(var x =0; x < _response.length ;x++){
          if(this.id == _response[x].create_user_id){
           let obj = {
            create_user_id: _response[x].create_user_id,
            firstname: _response[x].first_name,
            surname : _response[x].surname,
            status: _response[x].status_id
            }    
            console.log(obj)   
            this.getStatus = obj.status 
          }
        }
    
        this.getApplicationStatusMethod()
      })
    }
    getApplicationStatusMethod() {
      console.log(this.getStatus)
      this.service.getApplicationStatus(this.getStatus).subscribe(_responseDataStatus => {
      this.description =_responseDataStatus.description
      this.displayStatus =_responseDataStatus.id
      console.log(this.displayStatus)
      })
    }
    getDepartment() {
      this.service.getDepartment2(this.department_id).subscribe(_responseDataDepartment => {
        this.departmentDescription = _responseDataDepartment.description
      })
  }

}
