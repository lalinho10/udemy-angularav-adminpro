import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { StorageService } from 'src/app/services/storage/storage.service';

import { Appuser } from 'src/app/models/appuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  private tokenSubscription: Subscription;
  private userSubscription: Subscription;

  token: string;
  user: Appuser;

  constructor(
    private autheticationService: AuthenticationService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.storageService.getToken().subscribe( token => this.token = token );
    this.storageService.getUser().subscribe( user => this.user = user );
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
