import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Doctor } from 'src/app/models/doctor';

import { FilesService } from 'src/app/services/files/files.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {
  private apiHost = environment.restApiHost;

  constructor(
    private http: HttpClient,
    private filesService: FilesService
  ) {}

  getDoctors( page: number, regspp: number, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.get( `${ this.apiHost }/doctors?page=${ page }&regspp=${ regspp }`, httpOptions );
  }

  getDoctor( doctorId: string, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.get( `${ this.apiHost }/doctors/${ doctorId }`, httpOptions );
  }

  searchDoctor( search: string, page: number, regspp: number ): Observable<Object> {
    return this.http.get( `${ this.apiHost }/search/collection/doctors/${ search }?page=${ page }&regspp=${ regspp }` );
  }

  createDoctor( doctor: Doctor, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.post( `${ this.apiHost }/doctors`, doctor, httpOptions );
  }

  updateDoctor( doctor: Doctor, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.put( `${ this.apiHost }/doctors/${ doctor._id }`, doctor, httpOptions );
  }

  updateDoctorImage( file: File, doctorId: string, token: string ): Observable<Object> {
    return this.filesService.sendFile( file, 'doctors', doctorId, token );
  }

  deleteDoctor( doctorId: string, token: string ): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'token': token })
    };

    return this.http.delete( `${ this.apiHost }/doctors/${ doctorId }`, httpOptions );
  }

}
