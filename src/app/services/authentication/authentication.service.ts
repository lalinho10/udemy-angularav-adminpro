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
    const apiRequest: Observable<Object> = this.http.post( `${ this.apiHost }/login`, appuser );

    apiRequest.subscribe( ( response ) => {
      this.storageService.setLoginResponseLocalStorage( response, rememberme );
    });

    return apiRequest;
  }

  loginGoogleUser( idToken: string ): Observable<Object> {
    const apiRequest: Observable<Object> = this.http.post( `${ this.apiHost }/login/google`, { idToken } );

    apiRequest.subscribe( ( response ) => {
      this.storageService.setLoginResponseLocalStorage( response );
    });

    return apiRequest;
  }

  isUserAuthenticated(): boolean {
    return ( this.storageService.getStorageToken() !== null );
  }

  logoutUser() {
    if ( this.storageService.isGoogleUser() ) {
      console.log( 'Usuario de google' );
    }

    this.storageService.clearLocalStorage();

    this.router.navigate( [ '/login' ] );
  }

}
