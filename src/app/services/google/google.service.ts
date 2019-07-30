import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class GoogleService {

  auth2: any;

  constructor() {
    console.log(this.auth2);
    console.log('Iniciando servicio de google');
    this.init_google_signin();
    console.log(this.auth2);
  }

  init_google_signin() {
    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '31969845271-k6rfntb95c6ao7s5508pv3gjsprbd4pv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
    });
  }

}
