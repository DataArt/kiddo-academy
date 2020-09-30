import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'projects/kiddo-academy/src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(
    private translateService: TranslateService,
    private http: HttpClient
  ) { }

  private readonly timestamp = Date.now();

  async processLanguageConfiguration(): Promise<void> {
    const availableLanguages = await this.http.get<string[]>(`/assets/i18n/availableLangs.json?timestamp=${this.getTimestamp()}`)
    .toPromise();

    const url = new URL(window.location.href);
    const paramsLang = url.searchParams.get('lang');

    this.translateService.addLangs(availableLanguages);

    const savedLang = localStorage.getItem(environment.localStorageKeys.selectedLanguage);
    const browserLang = this.translateService.getBrowserLang();

    if (paramsLang && this.translateService.getLangs().includes(paramsLang)) {
      localStorage.setItem(environment.localStorageKeys.selectedLanguage, paramsLang);
      this.translateService.use(paramsLang);
    } else if (savedLang && this.translateService.getLangs().includes(savedLang)) {
      this.translateService.use(savedLang);
    } else if (this.translateService.getLangs().includes(browserLang)) {
      this.translateService.setDefaultLang(browserLang);
      this.translateService.use(browserLang);
    } else {
      this.translateService.setDefaultLang('ru');
      this.translateService.use('ru');
    }


  }

  changeCurrentLanguage(lang: string): void {
    lang = lang.toLowerCase();
    this.translateService.use(lang);
    localStorage.setItem(environment.localStorageKeys.selectedLanguage, lang);
    document.dispatchEvent(new CustomEvent('LangChangeEvent', { detail: { lang } }));
  }

  getAvailableLanguages(): string[] {
    return this.translateService.getLangs();
  }

  getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  translate(prefix: string): (key: string, params?: any) => string {
    return (key, params?) => this.translateService.instant(prefix + key, params) as string;
  }

  translateAsync(prefix: string): (key: string, params?: any) => Promise<string> {
    return async (key, params?) => await this.translateService.get(prefix + key, params).toPromise<string>();
  }

  getTimestamp(): number {
    return this.timestamp;
  }

}
