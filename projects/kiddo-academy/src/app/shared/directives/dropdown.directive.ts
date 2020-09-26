import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[kiddoAcademyDropdown]'
})
export class DropdownDirective {  // TODO: refactor nested dropdowns logic

  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event): void {
    if (this.elRef.nativeElement.contains(event.target)) {
      const targetEl = event.target as Element;
      this.isOpen = targetEl.classList.contains('dropdown-toggle') || targetEl.parentElement?.classList.contains('dropdown-toggle')
        ? true
        : !this.isOpen;
    } else {
      this.isOpen = false;
    }
  }

  constructor(private elRef: ElementRef) { }

}
