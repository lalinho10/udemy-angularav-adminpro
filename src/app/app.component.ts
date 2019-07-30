import { Component, OnInit } from '@angular/core';

import { SettingsService } from './services/settings.service';

declare function init_plugins();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor( private settignsService: SettingsService ) {}

  ngOnInit() {
    init_plugins();
  }

}
