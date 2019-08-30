import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Hospital } from 'src/app/models/hospital';
import { FilesService } from 'src/app/services/files/files.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HospitalsService {
  private apiHost = environment.restApiHost;

  constructor(
    private fileService: FilesService,
    private http: HttpClient
  ) {}

  getHospitals( page: number, regspp: number, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.get( `${ this.apiHost }/hospitals?page=${ page }&regspp=${ regspp }`, httpOptions );
  }

  getHospital( hospitalId: string, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.get( `${ this.apiHost }/hospitals/${ hospitalId}`, httpOptions );
  }

  searchHospital( search: string, page: number, regspp: number ): Observable<Object> {
    return this.http.get( `${ this.apiHost }/search/collection/hospitals/${ search }?page=${ page }&regspp=${ regspp }` );
  }

  createHospital( hospital: Hospital, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.post( `${ this.apiHost }/hospitals`, hospital, httpOptions );
  }

  updateHospital( hospital: Hospital, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.put( `${ this.apiHost }/hospitals/${ hospital._id }`, hospital, httpOptions );
  }

  updateHospitalImage( file: File, hospitalId: string, token: string ): Observable<Object> {
    return this.fileService.sendFile( file, 'hospital', hospitalId, token );
  }

  deleteHospital( hospitalId: string, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.delete( `${ this.apiHost }/hospitals/${ hospitalId }`, httpOptions );
  }

}
