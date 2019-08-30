import { Component, OnInit } from '@angular/core';

declare var swal: any;

import { Appuser } from 'src/app/models/appuser';

import { ModalUploadService } from 'src/app/pages/modal-upload/modal-upload.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {
  token: string;
  users: Appuser[];

  from: number = 0;
  to: number = 0;
  total: number = 0;
  isLastPage: boolean = false;
  loading: boolean = false;

  page: number = 1;
  regspp: number = 5;

  constructor(
    private modalUploadService: ModalUploadService,
    private storageService: StorageService,
    private userService: UserService
  ) {
    this.storageService.getToken().subscribe( token => this.token = token );
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): void {
    this.loading = true;

    this.userService.getUsers( this.page, this.regspp ).subscribe( ( response: any ) => {
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
    this.users = [];
  }

  private parseServiceResponse( response: any ): void {
    this.from = response.from || 0;
    this.to = response.to || 0;
    this.total = response.total || 0;

    this.isLastPage = response.lastPage;
    this.users = response.users;
  }

  searchUser( search: string ): void {
    if ( search.length <= 0 ) {
      return;
    }

    this.loading = true;

    this.resetSearchParams();

    this.userService.searchUser( search, this.page, this.regspp ).subscribe( ( response: any ) => {
      this.parseServiceResponse( response );
      this.loading = false;
    });
  }

  updateUserImage( userId: string ): void {
    this.modalUploadService.showModal( 'users', userId );
  }

  updateUser( user: Appuser ): void {
    this.userService.updateUser( user, this.token ).subscribe( ( response: any ) => {
      this.getUsers();

      swal( '¡Usuario actualizado correctamente!', response.user.name, 'success' );
    });
  }

  confirmDeleteUser( user: Appuser ): void {
    swal({
      title: '¿Estás seguro de eliminar al usuario ' + user.name + '?',
      text: 'Una vez eliminado, no se podrá recuperar su información',
      icon: 'warning',
      buttons: [ 'Cancelar', 'Eliminar' ],
      dangerMode: true,
    }).then( ( confirmDelete ) => {
      if ( confirmDelete ) {
        this.deleteUser( user._id );
      }
    });
  }

  deleteUser( userId: string ): void {
    this.userService.deleteUser( userId, this.token ).subscribe( ( response: any ) => {
      this.resetSearchParams();
      this.getUsers();

      swal( '¡Usuario eliminado correctamente!', response.user.name, 'success' );
    });
  }

  goTo( page: number ): void {
    this.page = page;
    this.getUsers();
  }

}
