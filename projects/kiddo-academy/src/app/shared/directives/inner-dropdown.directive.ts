import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[kiddoAcademyInnerDropdown]'
})
export class InnerDropdownDirective {

  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event): void {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) { }

}
