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
   
    // console.log(this.currentLoggedIn)
    // console.log(this.currentLoggedIn[0][0].username)
    this.id = this.currentLoggedIn[0][0].id
    this.username = this.currentLoggedIn[0][0].username
    this.surname = this.currentLoggedIn[0][0].surname
    this.id_number = this.currentLoggedIn[0][0].id_number
    this.email = this.currentLoggedIn[0][0].email

    this.getUserProfile();
    this.getApplication2()
  }

  swipeNext(){
    this.slides.slideNext();
  }

  getUserProfile() {
    this.service.getUserProfile(this.id).subscribe((_responseData) => {
      // console.log(_responseData)
      // this.created_id = _responseData.id
      this.firstname = _responseData.firstname
      this.surname = _responseData.surname
      this.persal_number = _responseData.persal_number
      // this.tel_number = _responseData.tel_number
      // this.cell_number = _responseData.cell_number
      // this.id_number = _responseData.id_number
      // this.branch_id = _responseData.branch_id
      this.department_id = _responseData.department_id
      this.job_functions = _responseData.job_functions
      // this.postal_address = _responseData.postal_address
      // this.designation_id = _responseData.designation_id
      // this.unit_id = _responseData.unit_id
      // this.postal_code = _responseData.postal_code
      // console.log(this.branch_id)
      // console.log(_responseData)

  this.getDepartment();
    })
 
    }
    getApplication2(){
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
      // this.displayStatus.l
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
