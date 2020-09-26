import { Component } from '@angular/core';

import { I18nService } from '../../shared/services/i18n.service';
import { GoogleAnalyticsService } from '../../shared/services';
import { environment } from 'projects/kiddo-academy/src/environments/environment';

@Component({
  selector: 'kiddo-academy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  readonly i18nPrefix = 'HEADER.';

  get allLangs(): string[] {
    return this.i18nService.getAvailableLanguages();
  }

  get currentLang(): string {
    return this.i18nService.getCurrentLanguage();
  }

  constructor(
    private i18nService: I18nService,
    private googleAnalyticsService: GoogleAnalyticsService,
  ) { }

  handleLangChange(lang: string): void {
    this.googleAnalyticsService.emitEvent(environment.googleAnalyticsEvents.dropdownClick, 'header: language_change_click');
    this.i18nService.changeCurrentLanguage(lang);
  }

}
