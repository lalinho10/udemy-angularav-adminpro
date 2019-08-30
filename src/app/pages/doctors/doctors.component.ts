import { Component, OnInit } from '@angular/core';

declare var swal: any;

import { Doctor } from 'src/app/models/doctor';

import { DoctorService } from 'src/app/services/doctors/doctor.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html'
})

export class DoctorsComponent implements OnInit {
  token: string;
  idLoggedUser: string;
  doctors: Doctor[];

  from: number = 0;
  to: number = 0;
  total: number = 0;
  isLastPage: boolean = false;
  loading: boolean = false;

  page: number = 1;
  regspp: number = 5;

  constructor(
    private doctorService: DoctorService,
    private storageService: StorageService
  ) {
    this.storageService.getToken().subscribe( token => this.token = token );
  }

  ngOnInit() {
    this.getDoctors();
  }

  private getDoctors(): void {
    this.loading = true;

    this.doctorService.getDoctors( this.page, this.regspp, this.token ).subscribe( ( response: any ) => {
      this.parseServiceResponse( response );
      this.loading = false;
    });
  }

  private resetSearchParams(): void {
    this.from = 0;
    this.to = 0;
    this.total = 0;

    this.page = 1;

    this.isLastPage = false;
    this.doctors = [];
  }

  private parseServiceResponse( response: any ): void {
    this.from = response.from || 0;
    this.to = response.to || 0;
    this.total = response.total || 0;

    this.isLastPage = response.lastPage;
    this.doctors = response.doctors;
  }

  searchDoctor( search: string ): void {
    if ( search.length <= 0 ) {
      return;
    }

    this.loading = true;

    this.resetSearchParams();

    this.doctorService.searchDoctor( search, this.page, this.regspp ).subscribe( ( response: any ) => {
      this.parseServiceResponse( response );
      this.loading = false;
    });
  }

  confirmDeleteDoctor( doctor: Doctor ): void {
    swal({
      title: '¿Estás seguro de eliminar al médico ' + doctor.name + '?',
      text: 'Una vez eliminado, no se podrá recuperar su información',
      icon: 'warning',
      buttons: [ 'Cancelar', 'Eliminar' ],
      dangerMode: true,
    }).then( ( confirmDelete ) => {
      if ( confirmDelete ) {
        this.deleteDoctor( doctor._id );
      }
    });
  }

  deleteDoctor( doctorId: string ): void {
    this.doctorService.deleteDoctor( doctorId, this.token ).subscribe( ( response: any ) => {
      this.resetSearchParams();
      this.getDoctors();

      swal( 'Médico eliminado correctamente!', response.doctor.name, 'success' );
    });
  }

  goTo( page: number ): void {
    this.page = page;
    this.getDoctors();
  }

}
