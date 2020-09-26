import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractNumber'
})
export class ExtractNumberPipe implements PipeTransform {
  transform(value: string): number {
    const extractedNumber = value.match(/\d/g)?.join('');
    return extractedNumber ? +extractedNumber : 0;
  }
}
