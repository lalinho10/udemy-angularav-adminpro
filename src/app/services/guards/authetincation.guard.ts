import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import swal from 'sweetalert';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const isAuhthenticated: boolean = this.authService.isUserAuthenticated();

    if ( !isAuhthenticated ) {
      swal( 'Sesión inválida', 'Favor de ingresar a la aplicación', 'info' );
      this.router.navigate( [ '/login' ] );
    }

    return isAuhthenticated;
  }

}
