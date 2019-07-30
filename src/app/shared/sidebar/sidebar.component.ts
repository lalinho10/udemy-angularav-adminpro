import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SidebarService } from 'src/app/services/sidebar.service.service';
import { StorageService } from 'src/app/services/storage/storage.service';

import { Appuser } from 'src/app/models/appuser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit, OnDestroy {
  private tokenSubscription: Subscription;
  private userSubscription: Subscription;

  token: string;
  user: Appuser;

  constructor(
    private autheticationService: AuthenticationService,
    public sidebarService: SidebarService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.tokenSubscription = this.storageService.getToken().subscribe( token => this.token = token );
    this.userSubscription = this.storageService.getUser().subscribe( user => this.user = user );
  }

  logout() {
    this.autheticationService.logoutUser();
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
