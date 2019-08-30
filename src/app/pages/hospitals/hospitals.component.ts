import { Component, OnInit } from '@angular/core';

declare var swal: any;

import { Hospital } from 'src/app/models/hospital';

import { ModalUploadService } from 'src/app/pages/modal-upload/modal-upload.service';
import { HospitalsService } from 'src/app/services/hospitals/hospitals.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html'
})

export class HospitalsComponent implements OnInit {
  token: string;
  idLoggedUser: string;
  hospitals: Hospital[];

  from: number = 0;
  to: number = 0;
  total: number = 0;
  isLastPage: boolean = false;
  loading: boolean = false;

  page: number = 1;
  regspp: number = 5;

  constructor(
    private hospitalsService: HospitalsService,
    private modalUploadService: ModalUploadService,
    private storageService: StorageService
  ) {
    this.storageService.getToken().subscribe( token => this.token = token );
    this.idLoggedUser = this.storageService.getStorageId();
  }

  ngOnInit() {
    this.getHospitals();
  }

  private getHospitals(): void {
    this.loading = true;

    this.hospitalsService.getHospitals( this.page, this.regspp, this.token ).subscribe( ( response: any ) => {
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
    this.hospitals = [];
  }

  private parseServiceResponse( response: any ): void {
    this.from = response.from || 0;
    this.to = response.to || 0;
    this.total = response.total || 0;

    this.isLastPage = response.lastPage;
    this.hospitals = response.hospitals;
  }

  searchHospital( search: string ): void {
    if ( search.length <= 0 ) {
      return;
    }

    this.loading = true;

    this.resetSearchParams();

    this.hospitalsService.searchHospital( search, this.page, this.regspp ).subscribe( ( response: any ) => {
      this.parseServiceResponse( response );
      this.loading = false;
    });
  }

  createHospital(): void {
    swal({
      text: 'Captura el nombre del hospital',
      content: 'input',
      button: {
        text: 'Guardar',
        closeModal: false,
      },
    }).then( ( hospitalName: string ) => {
      if ( !hospitalName || hospitalName.length === 0 ) {
        throw null;
      }

      const aHospital = new Hospital( hospitalName, this.idLoggedUser );

      this.hospitalsService.createHospital( aHospital, this.token ).subscribe( ( response: any ) => {
        this.getHospitals();

        swal( '¡Usuario creado correctamente!', response.hospital.name, 'success' );
      });
    });
  }

  updateHospitalImage( hospitalId: string ): void {
    this.modalUploadService.showModal( 'hospital', hospitalId );
  }

  updateHospital( hospital: Hospital ): void {
    hospital.user = this.idLoggedUser;

    this.hospitalsService.updateHospital( hospital, this.token ).subscribe( ( response: any ) => {
      this.getHospitals();

      swal( '¡Hospital actualizado correctamente!', response.hospital.name, 'success' );
    });
  }

  confirmDeleteHospital( hospital: Hospital ): void {
    swal({
      title: '¿Estás seguro de eliminar el hospital ' + hospital.name + '?',
      text: 'Una vez eliminado, no se podrá recuperar su información',
      icon: 'warning',
      buttons: [ 'Cancelar', 'Eliminar' ],
      dangerMode: true,
    }).then( ( confirmDelete ) => {
      if ( confirmDelete ) {
        this.deleteHospital( hospital._id );
      }
    });
  }

  deleteHospital( hospitalId: string ): void {
    this.hospitalsService.deleteHospital( hospitalId, this.token ).subscribe( ( response: any ) => {
      this.resetSearchParams();
      this.getHospitals();

      swal( 'Hospital eliminado correctamente!', response.hospital.name, 'success' );
    });
  }

  goTo( page: number ): void {
    this.page = page;
    this.getHospitals();
  }

}
