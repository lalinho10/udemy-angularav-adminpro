import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Appuser } from 'src/app/models/appuser';
import { StorageService } from 'src/app/services/storage/storage.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private apiHost = environment.restApiHost;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  loginUser( appuser: Appuser, rememberme: boolean ): Observable<Object> {
    const reqObservable: Observable<Object> = this.http.post( `${ this.apiHost }/login`, appuser );

    reqObservable.subscribe( ( response ) => {
      this.storageService.setLoginResponseLocalStorage( response, rememberme );
    });

    return reqObservable;
  }

  loginGoogleUser( idToken: string ): Observable<Object> {
    const reqObservable: Observable<Object> = this.http.post( `${ this.apiHost }/login/google`, { idToken } );

    reqObservable.subscribe( ( response ) => {
      this.storageService.setLoginResponseLocalStorage( response );
    });

    return reqObservable;
  }

  isUserAuthenticated(): boolean {
    return ( this.storageService.getStorageToken() !== null );
  }

  logoutUser() {
    if ( this.storageService.isGoogleUser() ) {
      this.googleSignout();
    }

    this.storageService.clearLocalStorage();

    this.router.navigate( [ '/login' ] );
  }

  private googleSignout() {
    /*this.googleService.auth2.signOut().then( function () {
      console.log('User signed out.');
    });*/
  }

}
