import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Appuser } from 'src/app/models/appuser';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private token: string;
  private appuser: Appuser;

  private tokenEmitter: BehaviorSubject<string> = new BehaviorSubject<string>( '' );
  private appuserEmitter: BehaviorSubject<Appuser> = new BehaviorSubject<Appuser>( null );

  constructor() {
    this.readStorage();
  }

  getToken(): Observable<string> {
    return this.tokenEmitter.asObservable();
  }

  getUser(): Observable<Appuser> {
    return this.appuserEmitter.asObservable();
  }

  getStorageToken(): string | null {
    return localStorage.getItem( 'token' );
  }

  setLoginResponseLocalStorage( loginResponse: any, rememberme: boolean = false ): void {
    if ( rememberme ) {
      localStorage.setItem( 'email', loginResponse.user.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    this.token = loginResponse.token;
    this.appuser = loginResponse.user;

    this.tokenEmitter.next( this.token );
    this.appuserEmitter.next( this.appuser );

    localStorage.setItem( 'id', loginResponse.id );
    localStorage.setItem( 'token', this.token );
    localStorage.setItem( 'user', JSON.stringify( this.appuser ) );
  }

  setUserLocalStorager( appuser: Appuser ): void {
    this.appuser = appuser;
    this.appuserEmitter.next( this.appuser );
    localStorage.setItem( 'user', JSON.stringify( appuser ) );
  }

  setTokenLocalStorage( token: string ): void {
    this.token = token;
    this.tokenEmitter.next( this.token );
    localStorage.setItem( 'token', token );
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

  readStorage(): void {
    if ( localStorage.getItem( 'user' ) !== null ) {
      this.appuser = JSON.parse( localStorage.getItem( 'user' ) );
      this.appuserEmitter.next( this.appuser );
    }

    if ( localStorage.getItem( 'token' ) !== null ) {
      this.token = localStorage.getItem( 'token' );
      this.tokenEmitter.next( this.token );
    }
  }

  checkRememberme(): string  {
    return localStorage.getItem( 'email' ) || '';
  }

  clearLocalStorage(): void {
    localStorage.removeItem( 'id' );
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'user' );
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }

}
