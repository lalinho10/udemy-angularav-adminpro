import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})

export class AccountSettingsComponent implements AfterViewInit {
  @ViewChildren( 'sel' ) allThemes: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    public settingsService: SettingsService
  ) {}

  ngAfterViewInit() {
    this.applyCheck();
  }

  changeTheme( theme: string ): void {
    this.settingsService.applyThemeSettings( theme );
    this.applyCheck();
  }

  applyCheck(): void {
    const selTheme: ElementRef = this.allThemes.find( ref => ref.nativeElement.classList.contains( 'working' ) );

    if ( selTheme ) {
      this.renderer.removeClass( selTheme.nativeElement, 'working' );
    }

    const newSelTheme: ElementRef = this.allThemes.find( ref => ref.nativeElement.getAttribute( 'data-theme' ) === this.settingsService.themeSetting.name );

    if ( newSelTheme ) {
      this.renderer.addClass( newSelTheme.nativeElement, 'working' );
    }
  }
}
