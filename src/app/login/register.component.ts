import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert';

import { DifferentPasswordValidator } from 'src/app/core/validators/different-password.validator';
import { Appuser } from 'src/app/models/appuser';
import { UserService } from 'src/app/services/user/user.service';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css' ]
})

export class RegisterComponent implements OnInit {
  frmRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    init_plugins();
    this.createForm();
  }

  private createForm() {
    this.frmRegister = this.fb.group({
      'name': [ '', Validators.required ],
      'email': [ '', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'password1': [ '', Validators.required ],
      'password2': [ '', Validators.required ],
      'terms': [ false ]
    }, {
      validators: DifferentPasswordValidator( 'password1', 'password2' )
    });
  }

  doRegister() {
    if ( this.frmRegister.invalid ) {
      return;
    }

    if ( !this.frmRegister.controls[ 'terms' ].value ) {
      swal( '¡Importante!', 'Debe aceptar los terminos y condiciones', 'warning' );
      return;
    }

    const appuser = new Appuser(
      this.frmRegister.controls[ 'name' ].value,
      this.frmRegister.controls[ 'email' ].value,
      this.frmRegister.controls[ 'password1' ].value
    );

    this.userService.createUser( appuser ).subscribe( ( response: any ) => {
      swal( '¡Usuario registrado correctamente!', response.user.email, 'success' );

      this.router.navigate( [ '/login' ] );
    });
  }

}
