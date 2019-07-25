import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Appuser } from 'src/app/models/appuser';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { StorageService } from 'src/app/services/storage/storage.service';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})

export class LoginComponent implements OnInit {
  auth2: any;
  email: string = '';
  remeberme: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    init_plugins();
    this.init_google();

    this.email = this.storageService.checkRememberme();
    this.remeberme = this.email !== '';
  }

  init_google() {
    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '31969845271-k6rfntb95c6ao7s5508pv3gjsprbd4pv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById( 'btnGoogle' ) );
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {},  ( googleUser ) => {
      const id_token = googleUser.getAuthResponse().id_token;

      this.authenticationService.loginGoogleUser( id_token ).subscribe( () => {
        this.router.navigate( [ '/pages/dashboard' ] );
      });
    }, ( error ) => {
      console.error( JSON.stringify( error, undefined, 2 ) );
    });
  }

  doLogin( form: NgForm ): void {
    if ( form.invalid ) {
      return;
    }

    const appuser = new Appuser(
      null,
      form.value.email,
      form.value.password
    );

    this.authenticationService.loginUser( appuser, form.value.rememberme ).subscribe( () => {
      this.router.navigate( [ '/pages/dashboard' ] );
    });
  }

}
