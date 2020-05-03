
import { Injectable } from '@angular/core';
import { ConfigService } from "./ConfigService";
import {User} from '../../model/user.model';
import {UserProfile} from '../../model/userProfile.model'
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LookUpProvider {
  private readonly baseUrl: string;
  constructor(public http: HttpClient,public configService: ConfigService) {
    this.baseUrl = this.configService.apiUrl;
  }




  getWorkCategory(){
    const url = `${this.baseUrl}/api/workcategory/get`;
    console.log(url)
    var dataUser = this.http.get(url,httpOptions)
    console.log(dataUser)
    return dataUser  
      .pipe(
        catchError(this.handleError)
      );  
  }


  getBranch(){
    const url = `${this.baseUrl}/api/branch/get`;
    console.log(url)
    var dataUser = this.http.get(url,httpOptions)
    console.log(dataUser)
    return dataUser  
      .pipe(
        catchError(this.handleError)
      );  
  }

  
  getDepartment(){
    const url = `${this.baseUrl}/api/department/get`;
    console.log(url)
    var dataUser = this.http.get(url,httpOptions)
    console.log(dataUser)
    return dataUser  
      .pipe(
        catchError(this.handleError)
      );  
  }

   
  getDesignation(){
    const url = `${this.baseUrl}/api/designation/get`;
    console.log(url)
    var dataUser = this.http.get(url,httpOptions)
    console.log(dataUser)
    return dataUser  
      .pipe(
        catchError(this.handleError)
      );  
  }

  getJob(){
    const url = `${this.baseUrl}/api/jobtitle/get`;
    console.log(url)
    var dataUser = this.http.get(url,httpOptions)
    console.log(dataUser)
    return dataUser  
      .pipe(
        catchError(this.handleError)
      );  
  }

  getUnit(){
    const url = `${this.baseUrl}/api/unit/get`;
    console.log(url)
    var dataUser = this.http.get(url,httpOptions)
    console.log(dataUser)
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

