import { Pipe, PipeTransform } from '@angular/core';

interface LanguageMap {
  [key: string]: string;
}

@Pipe({
  name: 'languageNative'
})
export class LanguageNativePipe implements PipeTransform {
  private languageMap: LanguageMap = {
    en: 'Eng',
    de: 'Deu',
    es: 'Esp',
    ru: 'Рус',
    ua: 'Укр',
    am: 'Հայ',
  };

  transform(value: string): string {
    return this.languageMap[value.toLowerCase()];
  }

}
