import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Appuser } from 'src/app/models/appuser';

import { FilesService } from 'src/app/services/files/files.service';
import { StorageService } from 'src/app/services/storage/storage.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiHost = environment.restApiHost;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private filesService: FilesService
  ) {}

  getUsers( page: number, regspp: number ): Observable<Object> {
    return this.http.get( `${ this.apiHost }/users?page=${ page }&regspp=${ regspp }` );
  }

  searchUser( search: string, page: number, regspp: number ): Observable<Object> {
    return this.http.get( `${ this.apiHost }/search/collection/users/${ search }?page=${ page }&regspp=${ regspp }` );
  }

  createUser( appuser: Appuser ): Observable<Object> {
    return this.http.post( `${ this.apiHost }/users`, appuser );
  }

  updateUser( appuser: Appuser, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    const reqObservable: Observable<Object> = this.http.put( `${ this.apiHost }/users/${ appuser._id }`, appuser, httpOptions );

    reqObservable.subscribe( ( response: any ) => {
      if ( appuser._id === this.storageService.getStorageId() ) {
        this.storageService.setUserLocalStorager( response.user );
      }
    });

    return reqObservable;
  }

  updateUserImage( file: File, userId: string, token: string ): Observable<Object> {
    const reqObservable: Observable<Object> = this.filesService.sendFile( file, 'users', userId, token );

    reqObservable.subscribe( ( response: any ) => {
      if ( userId === this.storageService.getStorageId() ) {
        this.storageService.setUserLocalStorager( response.user );
      }
    });

    return reqObservable;
  }

  deleteUser( userId: string, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.delete( `${ this.apiHost }/users/${ userId }`, httpOptions );
  }

}
