import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert';

import { Doctor } from 'src/app/models/doctor';
import { Hospital } from 'src/app/models/hospital';

import { DoctorService } from 'src/app/services/doctors/doctor.service';
import { HospitalsService } from 'src/app/services/hospitals/hospitals.service';
import { StorageService } from 'src/app/services/storage/storage.service';

declare function init_dropify();

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})

export class DoctorComponent implements OnInit {
  isUpdating: boolean = false;

  token: string;
  idLoggedUser: string;

  image: File;

  doctor: Doctor;
  hospital: Hospital;
  hospitals: Hospital[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private hospitalService: HospitalsService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.storageService.getToken().subscribe( token => this.token = token );
    this.idLoggedUser = this.storageService.getStorageId();
  }

  ngOnInit() {
    init_dropify();

    this.activatedRoute.params.subscribe( ( params ) => {
      if ( params.id === 'new' ) {
        this.doctor = new Doctor( '', '', '' );
        this.hospital = new Hospital( '', '' );
      } else {
        this.doctorService.getDoctor( params.id, this.token ).subscribe( ( response: any ) => {
          this.doctor = response.doctor;
          this.hospital = response.doctor.hospital;
          this.doctor.hospitalId = response.doctor.hospital._id;
        });
      }
    });

    this.hospitalService.getHospitals( 1, 10, this.token ).subscribe( ( response: any ) => {
      this.hospitals = response.hospitals;
    });
  }

  updateImage(): void {
    this.isUpdating = true;
  }

  selectFile( image: File ): void {
    if ( !image ) {
      this.image = null;
    } else  {
      this.image = image;
    }
  }

  updateDoctorImage(): void  {
    this.isUpdating = false;
    /*this.doctorService.updateDoctorImage( this.image, this.doctor._id, this.token ).subscribe( ( response: any ) => {
      swal( '¡Foto del médico actualizada correctamente!', response.doctor.name, 'success' );
    });*/
  }

  changeHospital( id: string ): void {
    this.hospital = this.hospitals.find( hospital => hospital._id === id );
  }

  saveDoctor( f: NgForm ): void {
    if ( f.invalid ) {
      return;
    }

    if ( this.doctor._id ) {
      this.doctorService.updateDoctor( this.doctor, this.token ).subscribe( ( response: any ) => {
        this.router.navigate( [ '/pages/doctors' ] );
        swal( '¡Médico actualizado correctamente!', response.doctor.name, 'success' );
      });
    } else {
      this.doctor.userId = this.idLoggedUser;

      this.doctorService.createDoctor( this.doctor, this.token ).subscribe( ( response: any ) => {
        this.router.navigate( [ '/pages/doctor', response.doctor._id ] );
        swal( '¡Médico creado correctamente!', response.doctor.name, 'success' );
      });
    }

  }

}
