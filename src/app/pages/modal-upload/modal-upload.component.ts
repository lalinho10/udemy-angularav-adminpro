import { Component, OnInit } from '@angular/core';

declare function init_dropify();

import { ModalUploadService } from './modal-upload.service';
import { FilesService } from 'src/app/services/files/files.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html'
})

export class ModalUploadComponent implements OnInit {
  token: string;

  modalStatus: string = '';

  image: File;

  constructor(
    private modalUploadService: ModalUploadService,
    private filesService: FilesService,
    private storageService: StorageService
  ) {
    this.storageService.getToken().subscribe( token => this.token = token );
  }

  ngOnInit() {
    init_dropify();
  }

  closeModal() {
    this.modalUploadService.hideModal();
    this.image = null;
    console.log( 'Image', this.image );
  }

  selectFile( image: File ): void {
    console.log( 'Image on change', image );
    if ( !image ) {
      this.image = null;
    } else  {
      this.image = image;
    }
    console.log( 'Image after change', this.image );
  }

  updateImage() {
    console.log( 'Update image', this.image );
    this.filesService.sendFile( this.image, this.modalUploadService.type, this.modalUploadService.typeId, this.token );
  }

}
