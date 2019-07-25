import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SidebarService } from 'src/app/services/sidebar.service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

export class SidebarComponent implements OnInit {

  constructor(
    private autheticationService: AuthenticationService,
    public sidebarService: SidebarService
  ) {}

  ngOnInit() {
  }

  logout() {
    this.autheticationService.logoutUser();
  }

}
