import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, AlertController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { UserProfile } from '../../model/userProfile.model'
import { Application } from '../../model/application.model'
import { Hours } from '../../model/hours.model'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RemunerativeWork } from '../../model/remunerative_work.model';
import { ToastController } from 'ionic-angular';
import { UpdateApplication } from '../../model/updateapplication.model'
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { saveAs } from 'file-saver';
import { Observable, Subject } from 'rxjs';
import { ModalController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { Storage } from "@ionic/storage";
import { LandingpagePage } from '../landingpage/landingpage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('mySlider') slides: Slides;
  public Application: Application
  public Hours: Hours
  public RemunerativeWork: RemunerativeWork
  public UpdateApplication: UpdateApplication
  private userForm: FormGroup;
  currentLoggedIn = new Array();
  image: any;
  id;
  firstname;
  surname;
  d = 1
  email;
  persal_number;
  tel_number;
  cell_number;
  application_date
  id_number;
  user_role_id;
  branch_id;
  department_id;
  job_title_id;
  designation_id;
  postal_code;
  postal_address;
  job_functions;
  unit_id;
  jobDescription;
  status_id;
  created_id;
  jobTitle
  branchDescription;
  work_category_id
  nature_of_work
  start_date
  end_date
  mon_start_hours
  mon_end_hours
  tue_start_hours
  tue_end_hours
  wed_start_hours
  wed_end_hours
  thu_start_hours
  thu_end_hours
  fri_start_hours
  fri_end_hours
  sat_start_hours
  sat_end_hours
  sun_start_hours
  sun_end_hours
  section_id
  total_working_hours
  remunerative_work_performed
  business_name
  reporting_person_surname
  reporting_person_initials
  contact_number;
  designated;
  departmentDescription;
  reporting_person_contact_number;
  unitDscritpion;
  application;
  originalListOfCsoes: UserProfile[] = [];
  filteredListOfCsoes: UserProfile[] = [];
  listOriginalLookupDistrict = [];
  listFilteredLookupDistrict = [];
  listOriginalLookupMunicipality = [];
  listFilteredLookupMunicipality = [];
  listFilteredLookupJob = [];
  listFilteredLookupDesignated = [];
  listFilteredLookupWorkCategory = [];
  listFilteredLookupWorkStatus = [];
  nursingCollegeDescription = [];
  districtOfficeDescription = []
  laundriesDscritpion = []
  showQuestions: boolean = false;
  showQuestions2: boolean = false;
  date;
  getExistingApplicationId;
  persalNumber;
  img: string = '../assets/imgs/default.png';
  message: File = null;
  getStatus: any;
  CurrentApplication;
  getCurrentUser = new Array();
  checkingIfApplicationExists;
  current_working_hours;
  current_overtime_hours_worked
  standby_duties_hours;
  today;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public verifyLogin: ServiceProvider,
    public navParams: NavParams,
    public service: ServiceProvider,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public http: HttpClient,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public auth: AuthProvider,
    public storage: Storage
  ) {
    this.currentLoggedIn.push(this.navParams.get('orgObject'));
    this.date = new Date().toISOString()
    this.id = this.currentLoggedIn[0][0].id
    this.firstname = this.currentLoggedIn[0][0].firstname
    this.surname = this.currentLoggedIn[0][0].surname
    this.id_number = this.currentLoggedIn[0][0].id_number
    this.email = this.currentLoggedIn[0][0].email
    this.getUserProfile();
    this.getWorkCategory();
    this.getApplicationStatusMethod();
    this._buildForm();

    // this.auth.login(this.currentLoggedIn).then((data)=>{
    //   console.log(data)
    // })
    this.service.uploadDocument().subscribe(_response => {
      // console.log(_response)
    })
  }
  BackToHome() {
    // this.navCtrl.rootNav.push(ViewController);
    this.navCtrl.push(LandingpagePage)
  }
  disableData() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("txtDate")[0].setAttribute('min', today);
    // console.log(today)
  }
  disableData1() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("txtDate2")[0].setAttribute('min', today);
  }

  ionViewDidLoad() {
    // this.getApplication();
    this.getExistingApplication();
    this.start_date = new Date().toISOString();

  }

  //**check if the application exists */
  getExistingApplication() {
    this.service.getApplication().subscribe(_response => {
      // console.log(_response)
      for (var x = 0; x < _response.length; x++) {
        // if (this.id == _response[x].create_user_id) {
        let obj = {
          create_user_id: _response[x].create_user_id,
          firstname: _response[x].first_name,
          surname: _response[x].surname,
          status: _response[x].status_id,
          application_id: _response[x].id
        }

        this.checkingIfApplicationExists = obj.create_user_id
        // console.log(this.checkingIfApplicationExists)
      }

    })
  }



  /**div slides created */
  moveToPage2() {
    let slideShow = document.getElementsByClassName('slideShow') as HTMLCollectionOf<HTMLElement>;
    let slideShow2 = document.getElementsByClassName('slideShow2') as HTMLCollectionOf<HTMLElement>;

    if (slideShow2[0].style.display == "none") {
      slideShow2[0].style.display = "block"
      slideShow[0].style.display = "none"

    } else if (slideShow2[0].style.display == "block") {
      slideShow2[0].style.display = "none"
      slideShow[0].style.display = "block"
    }
    else {
      slideShow[0].style.display = "none"
      slideShow2[0].style.display = "block"
    }

  }
  moveToPage3() {
    let slideShow2 = document.getElementsByClassName('slideShow2') as HTMLCollectionOf<HTMLElement>;
    let slideShow3 = document.getElementsByClassName('slideShow3') as HTMLCollectionOf<HTMLElement>;

    if (slideShow2[0].style.display == "none") {
      slideShow2[0].style.display = "block"
      slideShow3[0].style.display = "none"

    } else if (slideShow2[0].style.display == "block") {
      slideShow2[0].style.display = "none"
      slideShow3[0].style.display = "block"
    }
    else {
      slideShow3[0].style.display = "none"
      slideShow2[0].style.display = "block"
    }
  }
  moveToPage4() {
    let slideShow3 = document.getElementsByClassName('slideShow3') as HTMLCollectionOf<HTMLElement>;
    let slideShow4 = document.getElementsByClassName('slideShow4') as HTMLCollectionOf<HTMLElement>;

    if (slideShow3[0].style.display == "none") {
      slideShow3[0].style.display = "block"
      slideShow4[0].style.display = "none"

    } else if (slideShow3[0].style.display == "block") {
      slideShow3[0].style.display = "none"
      slideShow4[0].style.display = "block"
    }
    else {
      slideShow4[0].style.display = "none"
      slideShow3[0].style.display = "block"
    }
  }
  moveToPage5() {
    // console.log(this.id)

    if (this.checkingIfApplicationExists == this.id) {
      // console.log("application already exists")
    }
    else {
      this.Application = new Application();
      this.Application.first_name = this.userForm.value.firstname;
      this.Application.surname = this.userForm.value.surname;
      this.Application.email = this.userForm.value.email;
      this.Application.department_id = this.department_id;
      this.Application.branch_id = this.branch_id;
      this.Application.unit_id = this.unit_id;
      this.Application.office_phone_number = this.userForm.value.tel_number;
      this.Application.cellphone_number = this.userForm.value.cell_number;
      this.Application.id_number = this.userForm.value.id_number;
      this.Application.persal_number = this.userForm.value.persal_number;
      this.Application.job_functions = this.userForm.value.job_functions;
      this.Application.postal_address = this.userForm.value.postal_address;
      this.Application.postal_code = this.userForm.value.postal_code;
      this.Application.status_id = this.Application.status_id;
      this.Application.job_title_id = this.job_title_id;
      this.Application.application_date = this.date
      this.Application.create_time = this.date
      this.Application.create_user_id = this.id;
      this.Application.id = this.id;
      this.service.createApplication(this.Application).subscribe((_response: any) => {
        // console.log(_response)
        this.CurrentApplication = _response.id
        // console.log(_response.id)
      })
    }

    let slideShow4 = document.getElementsByClassName('slideShow4') as HTMLCollectionOf<HTMLElement>;
    let slideShow5 = document.getElementsByClassName('slideShow5') as HTMLCollectionOf<HTMLElement>;

    if (slideShow4[0].style.display == "none") {
      slideShow4[0].style.display = "block"
      slideShow5[0].style.display = "none"

    } else if (slideShow4[0].style.display == "block") {
      slideShow4[0].style.display = "none"
      slideShow5[0].style.display = "block"
    }
    else {
      slideShow5[0].style.display = "none"
      slideShow4[0].style.display = "block"
    }
  }
  moveToPage6() {
    if (this.current_working_hours == null || this.current_working_hours == undefined) {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'Please enter current hours to continue',
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.standby_duties_hours == null || this.standby_duties_hours == undefined) {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'Please enter the standby duties hours to continue',
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.current_overtime_hours_worked == null || this.current_overtime_hours_worked == undefined) {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'Please current overtime hours  to continue',
        buttons: ['OK']
      });
      alert.present();
    }


    else {
      if (this.checkingIfApplicationExists == this.id) {
        // console.log("application already exists")
      }
      else {
        this.Hours = new Hours();
        this.Hours.current_working_hours = this.userForm.value.current_working_hours;
        this.Hours.standby_duties_hours = this.userForm.value.standby_duties_hours;
        this.Hours.current_overtime_hours_worked = this.userForm.value.current_overtime_hours_worked;

        this.Hours.create_user_id = this.id
        this.Hours.created_time = this.date
        this.Hours.application_id = this.CurrentApplication
        this.service.createHours(this.Hours).subscribe((_response: any) => {
          // console.log(_response)
        })
      }


      let slideShow5 = document.getElementsByClassName('slideShow5') as HTMLCollectionOf<HTMLElement>;
      let slideShow6 = document.getElementsByClassName('slideShow6') as HTMLCollectionOf<HTMLElement>;

      if (slideShow5[0].style.display == "none") {
        slideShow5[0].style.display = "block"
        slideShow6[0].style.display = "none"

      } else if (slideShow5[0].style.display == "block") {
        slideShow5[0].style.display = "none"
        slideShow6[0].style.display = "block"
      }
      else {
        slideShow6[0].style.display = "none"
        slideShow5[0].style.display = "block"
      }
    }
  }



  moveToPage7() {
    if (this.work_category_id == null || this.work_category_id == undefined) {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'Please select your category to continue',
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.start_date == null || this.start_date == undefined) {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'Please select your start date to continue',
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.end_date == null || this.end_date == undefined) {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'Please select your end date to continue',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      let slideShow6 = document.getElementsByClassName('slideShow6') as HTMLCollectionOf<HTMLElement>;
      let slideShow7 = document.getElementsByClassName('slideShow7') as HTMLCollectionOf<HTMLElement>;

      if (slideShow6[0].style.display == "none") {
        slideShow6[0].style.display = "block"
        slideShow7[0].style.display = "none"

      } else if (slideShow6[0].style.display == "block") {
        slideShow6[0].style.display = "none"
        slideShow7[0].style.display = "block"
      }
      else {
        slideShow7[0].style.display = "none"
        slideShow6[0].style.display = "block"
      }
    }

  }
  moveToPage8() {
    // if (this.mon_start_hours == null && this.mon_end_hours == null || this.tue_start_hours == null && this.tue_end_hours == null
    //   || this.wed_start_hours == null && this.wed_end_hours == null || this.thu_start_hours == null && this.thu_end_hours == null
    //   || this.fri_start_hours == null && this.fri_end_hours == null || this.sat_start_hours == null && this.sat_end_hours == null
    //   || this.sun_start_hours == null && this.sun_end_hours == null) {

    //   const alert = this.alertCtrl.create({
    //     cssClass: "myAlert",
    //     subTitle: 'Please select atleast one day',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // }
    // else {
      let slideShow7 = document.getElementsByClassName('slideShow7') as HTMLCollectionOf<HTMLElement>;
      let slideShow8 = document.getElementsByClassName('slideShow8') as HTMLCollectionOf<HTMLElement>;

      if (slideShow7[0].style.display == "none") {
        slideShow7[0].style.display = "block"
        slideShow8[0].style.display = "none"

      } else if (slideShow7[0].style.display == "block") {
        slideShow7[0].style.display = "none"
        slideShow8[0].style.display = "block"
      }
      else {
        slideShow8[0].style.display = "none"
        slideShow7[0].style.display = "block"
      }
    // }

  }
  moveToPage9() {
    let slideShow8 = document.getElementsByClassName('slideShow8') as HTMLCollectionOf<HTMLElement>;
    let slideShow9 = document.getElementsByClassName('slideShow9') as HTMLCollectionOf<HTMLElement>;

    if (slideShow8[0].style.display == "none") {
      slideShow8[0].style.display = "block"
      slideShow9[0].style.display = "none"

    } else if (slideShow8[0].style.display == "block") {
      slideShow8[0].style.display = "none"
      slideShow9[0].style.display = "block"
    }
    else {
      slideShow9[0].style.display = "none"
      slideShow8[0].style.display = "block"
    }
  }
  moveToPage10() {
    if (this.checkingIfApplicationExists == this.id) {
      // console.log("application already exists")
    }
    else {
      this.RemunerativeWork = new RemunerativeWork();
      this.RemunerativeWork.work_category_id = this.userForm.value.work_category_id;
      this.RemunerativeWork.nature_of_work = this.userForm.value.nature_of_work;
      this.RemunerativeWork.start_date = this.userForm.value.start_date;
      this.RemunerativeWork.end_date = this.userForm.value.end_date;
      this.RemunerativeWork.mon_start_hours = this.userForm.value.mon_start_hours;
      this.RemunerativeWork.mon_end_hours = this.userForm.value.mon_end_hours;
      this.RemunerativeWork.tue_start_hours = this.userForm.value.tue_start_hours;
      this.RemunerativeWork.tue_end_hours = this.userForm.value.tue_end_hours;
      this.RemunerativeWork.wed_start_hours = this.userForm.value.wed_start_hours;
      this.RemunerativeWork.wed_end_hours = this.userForm.value.wed_end_hours;
      this.RemunerativeWork.thu_start_hours = this.userForm.value.thu_start_hours;
      this.RemunerativeWork.thu_end_hours = this.userForm.value.thu_end_hours;
      this.RemunerativeWork.fri_start_hours = this.userForm.value.fri_start_hours;
      this.RemunerativeWork.fri_end_hours = this.userForm.value.fri_end_hours;
      this.RemunerativeWork.sat_start_hours = this.userForm.value.sat_start_hours;
      this.RemunerativeWork.sat_end_hours = this.userForm.value.sat_end_hours;
      this.RemunerativeWork.sun_start_hours = this.userForm.value.sun_start_hours;
      this.RemunerativeWork.sun_end_hours = this.userForm.value.sun_end_hours;
      this.RemunerativeWork.total_working_hours = this.userForm.value.total_working_hours;
      this.RemunerativeWork.remunerative_work_performed = this.userForm.value.remunerative_work_performed;
      this.RemunerativeWork.business_name = this.userForm.value.business_name;
      this.RemunerativeWork.reporting_person_surname = this.userForm.value.reporting_person_surname;
      this.RemunerativeWork.reporting_person_initials = this.userForm.value.reporting_person_initials;
      this.RemunerativeWork.contact_number = this.userForm.value.contact_number;
      this.RemunerativeWork.reporting_person_contact_number = this.userForm.value.reporting_person_contact_number;
      this.RemunerativeWork.create_time = this.date
      this.RemunerativeWork.create_user_id = this.id
      this.RemunerativeWork.application_id = this.CurrentApplication
      this.service.createRemunerativeWork(this.RemunerativeWork).subscribe((_response: any) => {
        // console.log(_response)
      });
    }
    let slideShow9 = document.getElementsByClassName('slideShow9') as HTMLCollectionOf<HTMLElement>;
    let slideShow10 = document.getElementsByClassName('slideShow10') as HTMLCollectionOf<HTMLElement>;

    if (slideShow9[0].style.display == "none") {
      slideShow9[0].style.display = "block"
      slideShow10[0].style.display = "none"

    } else if (slideShow9[0].style.display == "block") {
      slideShow9[0].style.display = "none"
      slideShow10[0].style.display = "block"
    }
    else {
      slideShow10[0].style.display = "none"
      slideShow9[0].style.display = "block"
    }
  }
  moveToPage11() {

    let slideShow10 = document.getElementsByClassName('slideShow10') as HTMLCollectionOf<HTMLElement>;
    let slideShow11 = document.getElementsByClassName('slideShow11') as HTMLCollectionOf<HTMLElement>;

    if (slideShow10[0].style.display == "none") {
      slideShow10[0].style.display = "block"
      slideShow11[0].style.display = "none"

    } else if (slideShow10[0].style.display == "block") {
      slideShow10[0].style.display = "none"
      slideShow11[0].style.display = "block"
    }
    else {
      slideShow11[0].style.display = "none"
      slideShow10[0].style.display = "block"
    }
  }
  moveToPage12() {
    if (this.checkingIfApplicationExists == this.id) {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'You have already applied',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.service.Declaration(this.getExistingApplicationId).subscribe((_response) => {
        // console.log(_response)
      })
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        subTitle: 'You have successfully applied',
        buttons: ['OK']
      });
      alert.present();


    }
  }



  uploadArr = new Array()
  getApplication() {
    // this.service.getApplication().subscribe(_response => {
    //   console.log( _response)
    //   this.application =_response.id
    // })
    this.service.uploadDocument().subscribe((_responseDocument: any) => {
      for (var z = 0; z < _responseDocument.length; z++) {
        // console.log(_responseDocument[z])

        // this.image =_responseDocument[z].file_name
        this.uploadArr.push(_responseDocument[z].file_name)
        this.uploadArr.push(_responseDocument[z])

      }
      // console.log(this.uploadArr)

    })
  }


  getUserProfile() {
    this.verifyLogin.getUserProfile(this.id).subscribe((_responseData) => {
      this.originalListOfCsoes = _responseData;
      this.filteredListOfCsoes = _responseData;
      this.created_id = _responseData.id
      this.firstname = _responseData.firstname
      this.surname = _responseData.surname
      this.persal_number = _responseData.persal_number
      this.tel_number = _responseData.tel_number
      this.cell_number = _responseData.cell_number
      this.id_number = _responseData.id_number
      this.branch_id = _responseData.branch_id
      this.department_id = _responseData.department_id
      this.job_title_id = _responseData.job_title_id
      this.postal_address = _responseData.postal_address
      this.designation_id = _responseData.designation_id
      this.unit_id = _responseData.unit_id
      this.postal_code = _responseData.postal_code
      // console.log(this.unit_id)
      // 
      this.getCurrentUser.push(_responseData)
      // console.log(this.getCurrentUser)

      this.getDistrictOffice();
      this.getLaundries();
      this.getNursingCollege();
      this.getHospital();

    })
  }

  //**display lookups */
  getDistrictOffice() {
    this.service.getDistrictOffice2(this.branch_id).subscribe(_responseDataDistrictOffice => {
      this.districtOfficeDescription = _responseDataDistrictOffice.description
      this.listFilteredLookupMunicipality = _responseDataDistrictOffice;
      // console.log(this.districtOfficeDescription)
    })
  }

  getLaundries() {
    this.service.getLaundries2(this.unit_id).subscribe(_responseDataLaundries => {
      this.laundriesDscritpion = _responseDataLaundries.description
    })
  }

  getNursingCollege() {
    this.service.getNursingCollege2(this.job_title_id).subscribe(_responseDataCollege => {
      this.nursingCollegeDescription = _responseDataCollege.description
    })
  }

  getHospital() {
    this.service.getHospital2(this.department_id).subscribe(_responseDataHospital => {
      this.nursingCollegeDescription = _responseDataHospital.description
    })
  }

  getWorkCategory() {
    this.service.getWorkCategory().subscribe(_responseDataCategory => {
      this.listFilteredLookupWorkCategory = _responseDataCategory
      // console.log(this.listFilteredLookupWorkCategory)
    })
  }
  getApplicationStatusMethod() {
    // this.verifyLogin.getApplicationStatus().subscribe(_responseDataStatus => {
    //   this.listFilteredLookupWorkStatus = _responseDataStatus
    // })
  }
  getHours() {
    this.verifyLogin.GetHours().subscribe(_responseDataHours => {
    })
  }






  // *capture on the form
  _buildForm() {
    this.userForm = this.formBuilder.group({
      'surname': ['', [Validators.required, Validators]],
      'firstname': ['', [Validators.required, Validators]],
      'email': ['', [Validators.required, Validators]],
      // 'unit_id': ['', [Validators.required, Validators]],
      'department_id': ['', [Validators.required, Validators]],
      'tel_number': ['', [Validators.required, Validators]],
      'id_number': ['', [Validators.required, Validators]],
      'branch_id': ['', [Validators.required, Validators]],
      'persal_number': ['', [Validators.required, Validators]],
      'job_functions': ['', [Validators.required, Validators]],
      'cell_number': ['', [Validators.required, Validators]],
      'postal_code': ['', [Validators.required, Validators]],
      'postal_address': ['', [Validators.required, Validators]],
      'status_id': ['', [Validators.required, Validators]],
      'current_working_hours': ['', [Validators.required, Validators]],
      'standby_duties_hours': ['', [Validators.required, Validators]],
      'current_overtime_hours_worked': ['', [Validators.required, Validators]],
      'work_category_id': ['', [Validators.required, Validators]],
      'nature_of_work': ['', [Validators.required, Validators]],
      'start_date': ['', [Validators.required, Validators]],
      'end_date': ['', [Validators.required, Validators]],
      'mon_start_hours': ['', [Validators.required, Validators]],
      'mon_end_hours': ['', [Validators.required, Validators]],
      'tue_start_hours': ['', [Validators.required, Validators]],
      'tue_end_hours': ['', [Validators.required, Validators]],
      'wed_start_hours': ['', [Validators.required, Validators]],
      'wed_end_hours': ['', [Validators.required, Validators]],
      'thu_start_hours': ['', [Validators.required, Validators]],
      'thu_end_hours': ['', [Validators.required, Validators]],
      'fri_start_hours': ['', [Validators.required, Validators]],
      'fri_end_hours': ['', [Validators.required, Validators]],
      'sat_start_hours': ['', [Validators.required, Validators]],
      'sat_end_hours': ['', [Validators.required, Validators]],
      'sun_start_hours': ['', [Validators.required, Validators]],
      'sun_end_hours': ['', [Validators.required, Validators]],
      'total_working_hours': ['', [Validators.required, Validators]],
      'remunerative_work_performed': ['', [Validators.required, Validators]],
      'business_name': ['', [Validators.required, Validators]],
      'reporting_person_surname': ['', [Validators.required, Validators]],
      'reporting_person_initials': ['', [Validators.required, Validators]],
      'contact_number': ['', [Validators.required, Validators]],
      'reporting_person_contact_number': ['', [Validators.required, Validators]],
      'choose': ['', [Validators.required, Validators]],
      'upLoadDocument': ['', [Validators.required, Validators]],
    });
  }

  insertpic(event: any) {
    // console.log(event)
    // this.upLoadDocument = <File>event.target.files[0]
    // // console.log(this.uploadArr)
    // console.log(this.upLoadDocument.name)
    // this.img = this.upLoadDocument.name
    // console.log(this.img)
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }


  // ***upload document
  uploadDocument() {
    let body = new FormData();
    // body.append('img', this.img,this.mesage.name);
    // this.img = this.upLoadDocument.name
    // console.log(this.img)
    this.http.post('http://156.38.140.58:5040/api/ApplicationDocument/UploadFile?application_id=' + this.checkingIfApplicationExists, body)
      .subscribe(res => {
        // console.log(res)
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: 'You have successfully Uploaded',
          buttons: ['OK']
        });
        alert.present();
      })
  }



  // **model page
  generatepdf() {
    // const modal = this.modalCtrl.create(GenerateDocumentPage, { orgObject: this.getCurrentUser });
    // modal.present();
  }


  // *validate input from the form
  formSubmit() {
  }
  _isInvalidControl(name: string) {
    return this.userForm.get(name).invalid && this.userForm.get(name).dirty;
  }


  // **hide and display filtered data
  AssessmentQuestions() {
    if (this.userForm.value.work_category_id == "28") {
      this.showQuestions = true;
      // console.log("show")
    }
    else {
      this.showQuestions = false
    }
  }
  Assessment() {
    if (this.userForm.value.choose == "1") {
      this.showQuestions2 = true;
      // console.log("show")
    }
    else {
      this.showQuestions2 = false
    }
  }






}
