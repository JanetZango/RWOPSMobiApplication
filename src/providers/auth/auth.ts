import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  isLoggedIn: Boolean;
  user: any;
  constructor(public http: HttpClient,public storage:Storage) {
    console.log('Hello AuthProvider Provider');

    

  }
  login(user) {
    return this.storage.set('user', user).then((data) => {
        this.isLoggedIn = true;
        this.user = user;
    });

}

logout() {

   return  this.storage.remove('user').then(() => {
        this.isLoggedIn = false;
        this.user = null;
    });

}

  isAuthenticated() {
    return this.isLoggedIn;
}

getUser() {
  return  this.storage.get('user')
}

}
