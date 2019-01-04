import { Injectable } from '@angular/core';

import { ThemeSetting } from '../interfaces/theme-setting';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  themeSetting: ThemeSetting = { url: './assets/css/colors/default.css', name: 'default' };

  constructor() {
    this.readThemeSettings();
  }

  private saveThemeSettings(): void {
    localStorage.setItem( 'themeSettings', JSON.stringify( this.themeSetting ) );
  }

  private readThemeSettings(): void {
    if ( localStorage.getItem( 'themeSettings' ) ) {
      this.themeSetting = JSON.parse( localStorage.getItem( 'themeSettings' ) );
    }

    this.applyThemeSettings( this.themeSetting.name );
  }

  applyThemeSettings( theme: string ): void {
    this.themeSetting.url = `./assets/css/colors/${ theme }.css`;
    this.themeSetting.name = theme;

    document.getElementById( 'theme' ).setAttribute( 'href', this.themeSetting.url );

    this.saveThemeSettings();
  }
}
