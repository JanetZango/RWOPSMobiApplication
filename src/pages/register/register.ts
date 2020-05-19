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
  logo: boolean = true
  lowdesign: boolean = true
  private User: User;
  public UserProfile: UserProfile
  private userForm: FormGroup;
  showQuestions2: boolean = false;
  showQuestionsPassword: boolean = false
  disableDistrictDropdown = true;
  disableMunicipalityDropdown = true;
  listOriginalLookupDistrict = [];
  listFilteredLookupDistrict = [];
  listOriginalLookupMunicipality = [];
  listFilteredLookupMunicipality = [];
  listFilteredLookupJob = [];
  listFilteredLookupDesignated = [];
  listFilteredLookupSupervior = [];
  listFilteredLookupUnit = [];
  superviorname;
  superviorsurname;
  supervioremail
  superviorid
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: ServiceProvider,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {
    this._buildForm();
    this.getBranch();
    this.getDepartment();
    this.getJob();
    this.getDesignation();
    this.getUnit();
    this.getProfile()
  }

  getProfile() {
    this.service.getUserProfile2().subscribe((_responseDataProfile) => {
      console.log(_responseDataProfile)
      // for(var x =0; x < _responseDataProfile.length ;x++){
        this.superviorname = _responseDataProfile[0].firstname
      //   console.log(this.superviorname)
      // }
     
      this.superviorsurname = _responseDataProfile.surname
      this.superviorid = _responseDataProfile.id
      this.supervioremail = _responseDataProfile.email
      this.listFilteredLookupSupervior = _responseDataProfile
    })
  }

  getBranch() {
    this.service.getBranch().subscribe(_responseDataBranch => {
      console.log(_responseDataBranch)
      this.listFilteredLookupMunicipality = _responseDataBranch;
      // console.log(this.listFilteredLookupMunicipality)
      // this.listOriginalLookupMunicipality = _responseDataBranch;
    })
  }


  getDepartment() {
    this.service.getDepartment().subscribe(_responseDataDepartment => {
      // console.log(_responseDataDepartment)
      this.listFilteredLookupDistrict = _responseDataDepartment


    })
  }
  getDesignation() {
    this.service.getDesignation().subscribe(_responseDataDesignation => {
      // console.log(_responseDataDesignation)
      this.listFilteredLookupDesignated = _responseDataDesignation
    })
  }

  getJob() {
    this.service.getJob().subscribe(_responseDataJob => {
      // console.log(_responseDataJob)
      this.listFilteredLookupJob = _responseDataJob
    })
  }
  getUnit() {
    this.service.getUnit().subscribe(_responseDataUnit => {
      // console.log(_responseDataUnit)
      this.listFilteredLookupUnit = _responseDataUnit
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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
  _buildForm() {
    this.userForm = this.formBuilder.group({
      'choose': ['', [Validators.required, Validators]],
      'surname': ['', [Validators.required, Validators]],
      'firstname': ['', [Validators.required, Validators]],
      'supervisor_id': ['', [Validators.required, Validators]],
      'email': ['', [Validators.required, Validators.email]],
      'unit_id': ['', [Validators.required, Validators]],
      'confirmPassword': ['', [Validators.required, Validators]],
      'password_hash': ['', [Validators.required, Validators]],
      // 'designation_id': ['', [Validators.required, Validators]],
      'department_id': ['', [Validators.required, Validators]],
      'tel_number': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15),]],
      'id_number': ['', [Validators.required, RsaIdValidator.isValid,]],
      'branch_id': ['', [Validators.required, Validators]],
      'persal_number': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5),]],
      'job_title_id': ['', [Validators.required, Validators]],
      'cell_number': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15),]],
      // 'postal_code': ['', [Validators.required, Validators]],
      // 'postal_address': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100),]],
    }, {
      validator: MustMatch('password_hash', 'confirmPassword')

    });

  }

  Assessment() {
    if (this.userForm.value.choose == "1") {
      this.showQuestions2 = true;
      // console.log("show")
    }
    // else {
    //   this.showQuestions2 = false

    // }

    else if (this.userForm.value.choose = "2") {
      this.showQuestionsPassword = true
    }
    else {
      this.showQuestionsPassword = false
      this.showQuestions2 = false
    }

  }
  convertPassword() {
    var pass = Md5.hashStr('password_hash')
    // console.log(pass)
  }

  formSubmit() {
    this.UserProfile = new UserProfile();
    // console.log(this.UserProfile)
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


     this.User = new User();
    // this.userForm.value.password_hash = (Md5.hashStr('password_hash')as string)
    this.User.password_hash = this.userForm.value.password_hash;
    this.User.username = this.userForm.value.username;
    this.User.email = this.userForm.value.email;

    this.User.username = this.userForm.value.email;
    this.User.role = this.User.role
    this.User.user_status = this.User.user_status
    console.log(this.User.user_status)
    this.service.create(this.User).subscribe((_response: any) => {
      this.UserProfile.user_id = _response.id
      this.UserProfile.supervisor_name = this.superviorname
      this.UserProfile.supervisor_email = this.supervioremail
      this.UserProfile.designation_id = this.UserProfile.designation_id
      this.service.createProfile(this.UserProfile).subscribe((_responseUser: any) => {
        const toast = this.toastCtrl.create({
          message: 'User has successfully registered',
          duration: 3000
        });
        toast.present();
        this.navCtrl.push(LoginPage)
      });
    });
  }

  _isInvalidControl(name: string) {
    return this.userForm.get(name).invalid && this.userForm.get(name).dirty;
  }

  onchangeDistrict() {
    const _districtGuid = this.userForm.get('department_id').value;
    this.disableMunicipalityDropdown = false;
    this._updateMunicipality(_districtGuid);
  }

  _updateMunicipality(id: number) {
    this.listFilteredLookupMunicipality = this.listOriginalLookupMunicipality.filter(x => x.id === id);
    // console.log(this.listFilteredLookupMunicipality)
  }

}
