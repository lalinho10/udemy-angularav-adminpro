import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import swal from 'sweetalert';

import { StorageService } from 'src/app/services/storage/storage.service';

import { Appuser } from 'src/app/models/appuser';
import { UserService } from 'src/app/services/user/user.service';

declare function init_dropify();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit, OnDestroy {
  private tokenSubscription: Subscription;
  private userSubscription: Subscription;

  token: string;
  user: Appuser;

  image: File;

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    init_dropify();

    this.tokenSubscription = this.storageService.getToken().subscribe( token => this.token = token );
    this.userSubscription = this.storageService.getUser().subscribe( user => this.user = user );
  }

  updateUser( f: NgForm ): void {
    if ( f.invalid ) {
      return;
    }

    this.user.name = f.value.name;
    this.user.email = f.value.email;

    this.userService.updateUser( this.user, this.token ).subscribe( ( response: any ) => {
      swal( '¡Usuario actualizado correctamente!', response.user.name, 'success' );
    });
  }

  selectFile( image: File ): void {
    if ( !image ) {
      this.image = null;
    } else  {
      this.image = image;
    }
  }

  updateUserImage(): void  {
    this.userService.updateUserImage( this.image, this.user._id, this.token ).subscribe( ( response: any ) => {
      swal( '¡Imagen de usuario actualizada correctamente!', response.user.name, 'success' );
    });
  }

  ngOnDestroy() {
    if ( this.tokenSubscription ) {
      this.tokenSubscription.unsubscribe();
    }

    if ( this.userSubscription ) {
      this.userSubscription.unsubscribe();
    }
  }

}
