import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Appuser } from 'src/app/models/appuser';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiHost = environment.restApiHost;

  constructor(
    private http: HttpClient
  ) {}

  createUser( appuser: Appuser): Observable<Object> {
    return this.http.post( `${ this.apiHost }/users`, appuser );
  }

}
