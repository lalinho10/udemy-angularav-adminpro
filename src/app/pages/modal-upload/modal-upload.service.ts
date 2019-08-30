import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalUploadService {
  modalStatus: string = 'hide';
  type: string = '';
  typeId: string = '';

  constructor() {}

  showModal( type: string, typeId: string ) {
    this.modalStatus = '';
    this.type = type;
    this.typeId = typeId;
  }

  hideModal() {
    this.modalStatus = 'hide';
    this.type = '';
    this.typeId = '';
  }

}
