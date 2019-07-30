import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Appuser } from 'src/app/models/appuser';
import { StorageService } from 'src/app/services/storage/storage.service';

import { environment } from 'src/environments/environment';
import { FilesService } from 'src/app/services/files/files.service';

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

  createUser( appuser: Appuser ): Observable<Object> {
    return this.http.post( `${ this.apiHost }/users`, appuser );
  }

  updateUser( appuser: Appuser, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    const reqObservable: Observable<Object> = this.http.put( `${ this.apiHost }/users/${ appuser._id }`, appuser, httpOptions );

    reqObservable.subscribe( ( response: any ) => {
      this.storageService.setUserLocalStorager( response.user );
    });

    return reqObservable;
  }

  updateUserImage( file: File, userId: string, token: string ): Observable<Object> {
    const reqObservable: Observable<Object> = this.filesService.sendFile( file, 'users', userId, token );

    reqObservable.subscribe( ( response: any ) => {
      this.storageService.setUserLocalStorager( response.user );
    });

    return reqObservable;
  }

}
