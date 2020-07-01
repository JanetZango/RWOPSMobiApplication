import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { User } from '../../model/user.model';
import { UserProfile } from '../../model/userProfile.model'
import { ServiceProvider } from '../../providers/service/service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { ToastController } from 'ionic-angular';
import { RsaIdValidator } from "../../providers/validators/rsaid.validator";
import { MustMatch } from '../../providers/validators/rsaid.validator';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  // *variables*
  logo: boolean = true
  lowdesign: boolean = true
  private User: User;
  public UserProfile: UserProfile
  private userForm: FormGroup;
  GetAllUsersFromUserProfile = new Array();
  showQuestions2: boolean = false;
  showQuestionsPassword: boolean = false
  disableDistrictDropdown = true;
  disableMunicipalityDropdown = true;
  listFilteredLookupDistrict = [];
  listFilteredLookupHospital = [];
  listFilteredLookupNursing = [];
  listFilteredLookupDesignated = [];
  listFilteredLookupSupervior = [];
  listOdSuperviors = [];
  listFilteredLookupLaundries = [];
  superviorname;
  superviorsurname;
  supervioremail
  superviorid
  firstname
  surname
  ExistingpersalNumber;
  ExistingEmailAddress;
  ExistingID
  getExistingProfile
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: ServiceProvider,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {

    // *methods*
    this._buildForm();
    this.getDistrict();
    this.getHospital();
    this.getNursing();
    this.getDesignation();
    this.getLaundries();
    this.getProfile();

  }

  ionViewDidLoad() {
    this.getUserProfile();
  }

  /***get the user profile */
  getProfile() {
    this.service.getUserProfile2().subscribe((_responseDataProfile) => {
      // console.log(_responseDataProfile)
      this.listOdSuperviors = _responseDataProfile
      // console.log(this.listOdSuperviors)
      this.superviorname = _responseDataProfile.firstname
      this.superviorsurname = _responseDataProfile.surname
      this.superviorid = _responseDataProfile.id
      this.supervioremail = _responseDataProfile.email
      this.listFilteredLookupSupervior = _responseDataProfile
    })
  }


  // *get current user profile
  getUserProfile() {
    this.service.getAllUserProfiles().subscribe((_responseData) => {
      // console.log(_responseData)
      for (var x = 0; x < _responseData.length; x++) {
        let obj = {
          persal_number: _responseData[x].persal_number
        }
        this.getExistingProfile = obj.persal_number
        // console.log(this.getExistingProfile)
      }
    })
  }

  // *********lookups
  /*district*/  //branch
  getDistrict() {
    this.service.getDistrictOffice().subscribe(_responseDataDistrict => {
      // console.log(_responseDataDistrict)
      this.listFilteredLookupDistrict = _responseDataDistrict
    })
  }

  /*hospital*/  //department
  getHospital() {
    this.service.getHospital().subscribe(_responseDataHospital => {
      this.listFilteredLookupHospital = _responseDataHospital
    })
  }
  getDesignation() {
    this.service.getDesignation().subscribe(_responseDataDesignation => {
      this.listFilteredLookupDesignated = _responseDataDesignation
    })
  }
  /*nusuring colleges*/    //job
  getNursing() {
    this.service.getNursingCollege().subscribe(_responseDataNursing => {
      this.listFilteredLookupNursing = _responseDataNursing
    })
  }

  /*laundries*/  //unit
  getLaundries() {
    this.service.getLaundries().subscribe(_responseDataLaundries => {
      this.listFilteredLookupLaundries = _responseDataLaundries
      // console.log(this.listFilteredLookupLaundries)
    })
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
  signIn() {
    this.navCtrl.push(LoginPage)
  }


  // *requiremnts of the form
  _buildForm() {
    this.userForm = this.formBuilder.group({
      'choose': ['', [Validators.required, Validators]],
      'surname': ['', [Validators.required, Validators]],
      'firstname': ['', [Validators.required, Validators]],
      'supervisor_id': ['', [Validators.required, Validators]],
      'email': ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      // 'passport_number': ['', [Validators.required, Validators.email]],
      'unit_id': ['', [Validators.required, Validators]],
      'confirmPassword': ['', [Validators.required, Validators]],
      'password_hash': ['', [Validators.required, Validators]],
      'department_id': ['', [Validators.required, Validators]],
      'tel_number': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15),]],
      'id_number': ['', [Validators.required, RsaIdValidator.isValid,]],
      'branch_id': ['', [Validators.required, Validators]],
      'persal_number': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8),]],
      'job_title_id': ['', [Validators.required, Validators]],
      'cell_number': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15),]],

    }, {
      validator: MustMatch('password_hash', 'confirmPassword')

    });

  }



  // **filter the selected data
  Assessment() {
    if (this.userForm.value.choose == "1") {
      this.showQuestions2 = true;
      this.showQuestionsPassword = false
    }
    else if (this.userForm.value.choose == "2") {
      this.showQuestionsPassword = true
      this.showQuestions2 = false;
    }
  }

  convertPassword() {
    var pass = Md5.hashStr('password_hash')
  }


  // **submit data 
  formSubmit() {
    // console.log(this.getExistingProfile)
    // this.service.getAllUserProfiles().subscribe((_responseData) => {
    //   for (var x = 0; x < _responseData.length; x++) {
    //     let obj = {
    //       persal_number: _responseData[x].persal_number,
    //       email: _responseData[x].email,
    //       id_number: _responseData[x].id_number
    //     }
    //     this.ExistingpersalNumber = obj.persal_number
    //     this.ExistingEmailAddress = obj.email
    //     this.ExistingID = obj.id_number


    //     if (this.userForm.value.persal_number == this.ExistingpersalNumber) {
    //       const alert = this.alertCtrl.create({
    //         subTitle: 'This persal number alaready exist',
    //         buttons: ['OK']
    //       });
    //       alert.present();
    //     }
    //     else if (this.userForm.value.email == this.ExistingEmailAddress) {
    //       const alert = this.alertCtrl.create({
    //         subTitle: 'This email address number alaready exist',
    //         buttons: ['OK']
    //       });
    //       alert.present();
    //     }
    //     else if (this.userForm.value.id_number == this.ExistingID) {
    //       const alert = this.alertCtrl.create({
    //         subTitle: 'This id number number alaready exist',
    //         buttons: ['OK']
    //       });
    //       alert.present();
    //     }
    //     else {
    //       console.log("doesnot exist")
          this.UserProfile = new UserProfile();
          this.UserProfile.firstname = this.userForm.value.firstname;
          this.UserProfile.surname = this.userForm.value.surname;
          this.UserProfile.email = this.userForm.value.email;
          this.UserProfile.designation_id = this.userForm.value.designation_id;
          this.UserProfile.department_id = this.userForm.value.department_id;
          this.UserProfile.branch_id = this.userForm.value.branch_id;
          this.UserProfile.tel_number = this.userForm.value.tel_number;
          this.UserProfile.cell_number = this.userForm.value.cell_number;
          this.UserProfile.id_number = this.userForm.value.id_number;
          this.UserProfile.persal_number = this.userForm.value.persal_number;
          this.UserProfile.job_title_id = this.userForm.value.job_title_id;
          this.UserProfile.postal_address = this.userForm.value.postal_address;
          this.UserProfile.postal_code = this.userForm.value.postal_code;
          this.UserProfile.unit_id = this.userForm.value.unit_id;
          this.UserProfile.supervisor_id = this.userForm.value.supervisor_id;
          this.UserProfile.passport_number = this.userForm.value.passport_number


          this.User = new User();
          this.User.password_hash = this.userForm.value.password_hash;
          this.User.username = this.userForm.value.username;
          this.User.email = this.userForm.value.email;

          this.User.username = this.userForm.value.email;
          this.User.role = this.User.role
          this.User.user_status = this.User.user_status
          this.service.create(this.User).subscribe((_response: any) => {
          this.UserProfile.user_id = _response.id
          this.UserProfile.supervisor_name = this.superviorname
          this.UserProfile.supervisor_email = this.supervioremail
          this.UserProfile.designation_id = this.UserProfile.designation_id
          this.service.createProfile(this.UserProfile).subscribe((_responseUser: any) => {
            const alert = this.alertCtrl.create({
              subTitle: 'User has successfully registered',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(LoginPage)
          });
          });
        // }
      // }

    // })
  }


  // ***display error if data not entered
  _isInvalidControl(name: string) {
    return this.userForm.get(name).invalid && this.userForm.get(name).dirty;
  }





}