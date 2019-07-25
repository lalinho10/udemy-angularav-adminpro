import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

export class HeaderComponent implements OnInit {

  constructor(
    private autheticationService: AuthenticationService
  ) {}

  ngOnInit() {
  }

  logout() {
    this.autheticationService.logoutUser();
  }
}
