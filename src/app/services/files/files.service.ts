import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FilesService {
  private apiHost = environment.restApiHost;

  constructor( private http: HttpClient ) {}

  sendFile( file: File, type: string, typeId: string, token: string ): Observable<Object> {
    const formData = new FormData();
    formData.append( 'image', file, file.name );

    return this.http.put( `${ this.apiHost }/upload/${ type }/${ typeId }?token=${ token }`, formData );
  }
}
