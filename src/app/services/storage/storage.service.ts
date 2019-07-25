import { Injectable } from '@angular/core';

import { Appuser } from 'src/app/models/appuser';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() {}

  getStorageToken(): string | null {
    return localStorage.getItem( 'token' );
  }

  setLoginResponseLocalStorage( loginResponse: any, rememberme: boolean = false ) {
    if ( rememberme ) {
      localStorage.setItem( 'email', loginResponse.user.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    localStorage.setItem( 'id', loginResponse.id );
    localStorage.setItem( 'token', loginResponse.token );
    localStorage.setItem( 'user', JSON.stringify( loginResponse.user ) );
  }

  isGoogleUser(): boolean {
    if ( localStorage.getItem( 'user' ) !== null ) {
      const user: Appuser = JSON.parse( localStorage.getItem( 'user' ) );

      if ( user.google !== undefined ) {
        return user.google;
      }
    }

    return false;
  }

  checkRememberme(): string  {
    return localStorage.getItem( 'email' ) || '';
  }

  clearLocalStorage() {
    // localStorage.clear();
    localStorage.removeItem( 'id' );
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'user' );
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }

}
