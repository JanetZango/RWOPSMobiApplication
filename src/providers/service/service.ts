
import { Injectable } from '@angular/core';
import { ConfigService } from "./ConfigService";
import { User } from '../../model/user.model';
import { UserProfile } from '../../model/userProfile.model'
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { Application } from '../../model/application.model'
import { Hours } from '../../model/hours.model'
import { RemunerativeWork } from '../../model/remunerative_work.model'
import { UpdateApplication } from '../../model/updateapplication.model'
import { Token } from '../../model/token.model'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class ServiceProvider {
  private readonly baseUrl: string;
  constructor(public http: HttpClient, public configService: ConfigService) {
    this.baseUrl = this.configService.apiUrl;
  }



  ///************post methods

  createRemunerativeWork(RemunerativeWork: RemunerativeWork) {
    const url = `${this.baseUrl}/api/remunerativework/post`;
    var data = this.http.post(url, RemunerativeWork, httpOptions)
    // console.log(data)
    return data
      .pipe(
        catchError(this.handleError)
      );

  }

  generatetken(Token: Token) {
    const url = `https://uatapi.signinghub.co.za/authenticate`;
    var data = this.http.post(url, Token, httpOptions)
    return data
      .pipe(
        catchError(this.handleError)
      );

  }
  createHours(Hours: Hours) {
    const url = `${this.baseUrl}/api/workinghours/post`;
    var data = this.http.post(url, Hours, httpOptions)
    return data
      .pipe(
        catchError(this.handleError)
      );

  }

  GetHours() {
    const url = `${this.baseUrl}/api/workinghours/get`;
    var data = this.http.get(url, httpOptions)
    return data
      .pipe(
        catchError(this.handleError)
      );

  }
  createApplication(Application: Application) {
    const url = `${this.baseUrl}/api/application/post`;
    var data = this.http.post(url, Application, httpOptions)
    return data
      .pipe(
        catchError(this.handleError)
      );

  }

  getApplication() {
    const url = `${this.baseUrl}/api/application/get`;
    var data = this.http.get(url, httpOptions)
    return data
      .pipe(
        catchError(this.handleError)
      );

  }

  Declaration(id) {
    const url = `${this.baseUrl}/api/application/put/` + id;
    var data = this.http.put(url, UpdateApplication, httpOptions)
    return data
      .pipe(
        catchError(this.handleError)
      );

  }



  create(user: User) {
    const url = `${this.baseUrl}/api/user/post`;
    var data = this.http.post(url, user, httpOptions)
    return data
      .pipe(
        catchError(this.handleError)
      );

  }

  createProfile(userProfile: UserProfile) {
    const url = `${this.baseUrl}/api/userprofile/post`;
    var dataUser = this.http.post(url, userProfile, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );

  }

  ///*************get lookups

  getHospital() {
    const url = `${this.baseUrl}/api/Hospital/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }
  getLaundries() {
    const url = `${this.baseUrl}/api/Laundries/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }
  getNursingCollege() {
    const url = `${this.baseUrl}/api/NursingCollege/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }
  getDistrictOffice() {
    const url = `${this.baseUrl}/api/DistrictOffice/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser() {
    const url = `${this.baseUrl}/api/user/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }


  getUserProfile(user_id) {
    const url = `${this.baseUrl}/api/userprofile/get/` + user_id;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }


  //**supervisor lookup */

  getUserProfile2() {
    const url = `${this.baseUrl}/api/userprofile/getsupervisor/2`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }



  //**filter the lookups */

  getDistrictOffice2(id) {
    const url = `${this.baseUrl}/api/DistrictOffice/get/` + id;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }


  getDesignation2(id) {
    const url = `${this.baseUrl}/api/designation/get/` + id;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }

  getNursingCollege2(id) {
    const url = `${this.baseUrl}/api/NursingCollege/get/` + id;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }
  getHospital2(id) {
    const url = `${this.baseUrl}/api/Hospital/get/` + id;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }


  getApplicationStatus(id) {
    const url = `${this.baseUrl}/api/applicationstatus/get/` + id;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }

  getWorkCategory() {
    const url = `${this.baseUrl}/api/workcategory/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }

  getLaundries2(id) {
    const url = `${this.baseUrl}/api/Laundries/get/` + id;
    // console.log(url)
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }




  getBranch() {
    const url = `${this.baseUrl}/api/branch/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }


  getDepartment() {
    const url = `${this.baseUrl}/api/department/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }


  getDesignation() {
    const url = `${this.baseUrl}/api/designation/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }

  getJob() {
    const url = `${this.baseUrl}/api/jobtitle/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }

  getUnit() {
    const url = `${this.baseUrl}/api/unit/get`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadDocument() {
    const url = `${this.baseUrl}/api/ApplicationDocument/Get/64`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }

  getPersalNumber() {
    const url = `${this.baseUrl}/api/application/getactiveapplications?persal_number=123456`;
    var dataUser = this.http.get(url, httpOptions)
    return dataUser
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return _throw(errorRes);
  }






}
